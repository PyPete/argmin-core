// Copyright 2018 Stefan Kroboth
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://apache.org/licenses/LICENSE-2.0> or the MIT license <LICENSE-MIT or
// http://opensource.org/licenses/MIT>, at your option. This file may not be
// copied, modified, or distributed except according to those terms.

// TODO: Logging of "initial info"

use crate::serialization::*;
use crate::{
    ArgminCheckpoint, ArgminError, ArgminIterData, ArgminKV, ArgminLog, ArgminLogger, ArgminResult,
    ArgminWrite, ArgminWriter, Error, TerminationReason,
};
use paste::item;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use std::path::Path;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct OpWrapper<O: ArgminOp> {
    op: O,
    pub cost_func_count: u64,
    pub grad_func_count: u64,
    pub hessian_func_count: u64,
    pub modify_func_count: u64,
}

impl<O: ArgminOp> ArgminOp for OpWrapper<O> {
    type Param = O::Param;
    type Output = O::Output;
    type Hessian = O::Hessian;

    fn apply(&self, param: &Self::Param) -> Result<Self::Output, Error> {
        self.op.apply(param)
    }

    fn gradient(&self, param: &Self::Param) -> Result<Self::Param, Error> {
        self.op.gradient(param)
    }

    fn hessian(&self, param: &Self::Param) -> Result<Self::Hessian, Error> {
        self.op.hessian(param)
    }

    fn modify(&self, param: &Self::Param, extent: f64) -> Result<Self::Param, Error> {
        self.op.modify(param, extent)
    }
}

impl<O: ArgminOp> OpWrapper<O> {
    pub fn new(op: &O) -> Self {
        OpWrapper {
            op: op.clone(),
            cost_func_count: 0,
            grad_func_count: 0,
            hessian_func_count: 0,
            modify_func_count: 0,
        }
    }

    pub fn apply(&mut self, param: &O::Param) -> Result<O::Output, Error> {
        self.cost_func_count += 1;
        self.op.apply(param)
    }

    pub fn gradient(&mut self, param: &O::Param) -> Result<O::Param, Error> {
        self.grad_func_count += 1;
        self.op.gradient(param)
    }

    pub fn hessian(&mut self, param: &O::Param) -> Result<O::Hessian, Error> {
        self.hessian_func_count += 1;
        self.op.hessian(param)
    }

    pub fn modify(&mut self, param: &O::Param, extent: f64) -> Result<O::Param, Error> {
        self.modify_func_count += 1;
        self.op.modify(param, extent)
    }
}

/// This trait needs to be implemented for every operator/cost function.
///
/// It is required to implement the `apply` method, all others are optional and provide a default
/// implementation which is essentially returning an error which indicates that the method has not
/// been implemented. Those methods (`gradient` and `modify`) only need to be implemented if the
/// uses solver requires it.
pub trait ArgminOp: Clone + Send + Sync + Serialize {
    /// Type of the parameter vector
    type Param: Clone + Serialize;
    /// Output of the operator
    type Output;
    /// Type of Hessian
    type Hessian: Clone + Serialize;

    /// Applies the operator/cost function to parameters
    fn apply(&self, _param: &Self::Param) -> Result<Self::Output, Error> {
        Err(ArgminError::NotImplemented {
            text: "Method `apply` of ArgminOp trait not implemented!".to_string(),
        }
        .into())
    }

    /// Computes the gradient at the given parameters
    fn gradient(&self, _param: &Self::Param) -> Result<Self::Param, Error> {
        Err(ArgminError::NotImplemented {
            text: "Method `gradient` of ArgminOp trait not implemented!".to_string(),
        }
        .into())
    }

    /// Computes the hessian at the given parameters
    fn hessian(&self, _param: &Self::Param) -> Result<Self::Hessian, Error> {
        Err(ArgminError::NotImplemented {
            text: "Method `hessian` of ArgminOp trait not implemented!".to_string(),
        }
        .into())
    }

    /// Modifies a parameter vector. Comes with a variable that indicates the "degree" of the
    /// modification.
    fn modify(&self, _param: &Self::Param, _extent: f64) -> Result<Self::Param, Error> {
        Err(ArgminError::NotImplemented {
            text: "Method `modify` of ArgminOp trait not implemented!".to_string(),
        }
        .into())
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct IterState<O: ArgminOp> {
    param: Option<O::Param>,
    prev_param: Option<O::Param>,
    best_param: Option<O::Param>,
    prev_best_param: Option<O::Param>,
    cost: Option<f64>,
    prev_cost: Option<f64>,
    best_cost: Option<f64>,
    prev_best_cost: Option<f64>,
    target_cost: Option<f64>,
    grad: Option<O::Param>,
    prev_grad: Option<O::Param>,
    hessian: Option<O::Hessian>,
    prev_hessian: Option<O::Hessian>,
    iter: u64,
    max_iters: u64,
}

impl<O: ArgminOp> std::default::Default for IterState<O> {
    fn default() -> Self {
        IterState::new()
    }
}

macro_rules! setter {
    ($name:ident, $type:ty) => {
        pub fn $name(mut self, $name: $type) -> Self {
            self.$name = Some($name);
            self
        }
    };
}

macro_rules! getter {
    ($name:ident, $type:ty) => {
        item! {
            pub fn [<get_ $name>](&self) -> Option<$type> {
                self.$name
            }
        }
    };
}

impl<O: ArgminOp> IterState<O> {
    pub fn new() -> Self {
        IterState {
            param: None,
            prev_param: None,
            best_param: None,
            prev_best_param: None,
            cost: None,
            prev_cost: None,
            best_cost: None,
            prev_best_cost: None,
            target_cost: None,
            grad: None,
            prev_grad: None,
            hessian: None,
            prev_hessian: None,
            iter: 0,
            max_iters: std::u64::MAX,
        }
    }

    setter!(param, O::Param);
    setter!(prev_param, O::Param);
    setter!(best_param, O::Param);
    setter!(prev_best_param, O::Param);
    setter!(cost, f64);
    setter!(prev_cost, f64);
    setter!(best_cost, f64);
    setter!(prev_best_cost, f64);
    setter!(target_cost, f64);
    setter!(grad, O::Param);
    setter!(prev_grad, O::Param);
    setter!(hessian, O::Hessian);
    setter!(prev_hessian, O::Hessian);
    getter!(param, O::Param);
    getter!(prev_param, O::Param);
    getter!(best_param, O::Param);
    getter!(prev_best_param, O::Param);
    getter!(cost, f64);
    getter!(prev_cost, f64);
    getter!(best_cost, f64);
    getter!(prev_best_cost, f64);
    getter!(target_cost, f64);
    getter!(grad, O::Param);
    getter!(prev_grad, O::Param);
    getter!(hessian, O::Hessian);
    getter!(prev_hessian, O::Hessian);

    pub fn get_iter(&self) -> u64 {
        self.iter
    }

    pub fn get_max_iters(&self) -> u64 {
        self.max_iters
    }

    pub fn max_iters(mut self, max_iters: u64) -> Self {
        self.max_iters = max_iters;
        self
    }

    pub fn increment_iter(&mut self) {
        self.iter += 1;
    }
}

pub trait Solver<O: ArgminOp>: Serialize {
    /// Computes one iteration of the algorithm.
    fn next_iter(
        &mut self,
        op: &mut OpWrapper<O>,
        state: IterState<O>,
    ) -> Result<ArgminIterData<O>, Error>;

    /// Initializes the algorithm
    ///
    /// This is executed before any iterations are performed. It can be used to perform
    /// precomputations. The default implementation corresponds to doing nothing.
    fn init(
        &mut self,
        _op: &mut OpWrapper<O>,
        _state: IterState<O>,
    ) -> Result<Option<ArgminIterData<O>>, Error> {
        Ok(None)
    }

    fn terminate_internal(&mut self, state: &IterState<O>) -> TerminationReason {
        let solver_terminate = self.terminate(state);
        if solver_terminate.terminated() {
            return solver_terminate;
        }
        if state.get_iter() >= state.max_iters {
            return TerminationReason::MaxItersReached;
        }
        if state.get_cost() <= state.target_cost {
            return TerminationReason::TargetCostReached;
        }
        TerminationReason::NotTerminated
    }

    fn terminate(&mut self, _state: &IterState<O>) -> TerminationReason {
        TerminationReason::NotTerminated
    }
}

#[derive(Serialize, Deserialize)]
pub struct Executor<O: ArgminOp, S> {
    /// solver
    solver: S,
    /// operator
    op: O,
    /// State
    state: IterState<O>,
    // TODO: make getters for these values
    /// Number of cost function evaluations so far
    pub cost_func_count: u64,
    /// Number of gradient evaluations so far
    pub grad_func_count: u64,
    /// Number of gradient evaluations so far
    pub hessian_func_count: u64,
    /// Number of modify evaluations so far
    pub modify_func_count: u64,
    /// Reason of termination
    termination_reason: TerminationReason,
    /// Total time the solver required.
    total_time: std::time::Duration,
    /// Storage for loggers
    #[serde(skip)]
    logger: ArgminLogger,
    /// Storage for writers
    #[serde(skip)]
    writer: ArgminWriter<O::Param>,
    /// Checkpoint
    checkpoint: ArgminCheckpoint,
}

impl<O, S> Executor<O, S>
where
    O: ArgminOp,
    O::Param: Clone + Default,
    O::Hessian: Default,
    S: Solver<O>,
{
    pub fn new(op: O, solver: S, init_param: O::Param) -> Self {
        // TODO: prev_grad and prev_hessian! Do not forget to add the corresponding code to
        // update()!
        Executor {
            solver: solver,
            op: op,
            state: IterState::new(),
            cost_func_count: 0,
            grad_func_count: 0,
            hessian_func_count: 0,
            modify_func_count: 0,
            termination_reason: TerminationReason::NotTerminated,
            total_time: std::time::Duration::new(0, 0),
            logger: ArgminLogger::new(),
            writer: ArgminWriter::new(),
            checkpoint: ArgminCheckpoint::default(),
        }
    }

    pub fn from_checkpoint<P: AsRef<Path>>(path: P) -> Result<Self, Error>
    where
        Self: Sized + DeserializeOwned,
    {
        load_checkpoint(path)
    }

    fn update(&mut self, data: &ArgminIterData<O>) -> Result<(), Error> {
        if let Some(cur_param) = data.get_param() {
            // self.cur_cost = std::f64::NAN;
            self.state = self.state.prev_param(self.state.get_param().unwrap());
            // std::mem::swap(&mut self.prev_param, &mut self.cur_param);
            self.state = self.state.param(cur_param);
        }
        if let Some(cur_cost) = data.get_cost() {
            self.state = self.state.prev_cost(self.state.get_cost().unwrap());
            self.state = self.state.cost(cur_cost);
        }
        // check if parameters are the best so far
        if self.state.get_cost().unwrap() <= self.state.get_best_cost().unwrap() {
            self.state = self
                .state
                .best_param(self.state.get_param().clone().unwrap())
                .best_cost(self.state.get_cost().unwrap());
            // Tell everyone!
            self.writer.write(
                &self.state.get_best_param().unwrap(),
                self.state.get_iter(),
                true,
            )?;
        }
        if let Some(grad) = data.get_grad() {
            self.state = self.state.grad(grad);
        }
        if let Some(hessian) = data.get_hessian() {
            self.state = self.state.hessian(hessian);
        }
        if let Some(termination_reason) = data.get_termination_reason() {
            self.termination_reason = termination_reason;
        }
        Ok(())
    }

    pub fn run(&mut self) -> Result<ArgminResult<O::Param>, Error> {
        let total_time = std::time::Instant::now();

        // do the inital logging
        // let logs = make_kv!("max_iters" => self.max_iters();
        //                     #(#logs_str => #logs_expr;)*);
        let logs = make_kv!("max_iters" => self.state.get_max_iters(););
        // self.base.log_info(#solver_name, &logs)?;
        self.logger.log_info("blah", &logs)?;

        let running = Arc::new(AtomicBool::new(true));

        #[cfg(feature = "ctrlc")]
        {
            // Set up the Ctrl-C handler
            use ctrlc;
            let r = running.clone();
            // This is currently a hack to allow checkpoints to be run again within the
            // same program (usually not really a usecase anyway). Unfortunately, this
            // means that any subsequent run started afterwards will have not Ctrl-C
            // handling available... This should also be a problem in case one tries to run
            // two consecutive optimizations. There is ongoing work in the ctrlc crate
            // (channels and such) which may solve this problem. So far, we have to live
            // with this.
            match ctrlc::set_handler(move || {
                r.store(false, Ordering::SeqCst);
            }) {
                Err(ctrlc::Error::MultipleHandlers) => Ok(()),
                Err(e) => Err(e),
                Ok(r) => Ok(r),
            }?;
        }

        let mut op_wrapper = OpWrapper::new(&self.op);
        let init_data = self.solver.init(&mut op_wrapper, self.state)?;

        // If init() returned something, deal with it
        if let Some(data) = init_data {
            self.update(&data)?;
        }

        // TODO: write a method for this?
        self.cost_func_count = op_wrapper.cost_func_count;
        self.grad_func_count = op_wrapper.grad_func_count;
        self.hessian_func_count = op_wrapper.hessian_func_count;
        self.modify_func_count = op_wrapper.modify_func_count;

        while running.load(Ordering::SeqCst) {
            // let state = self.to_state();

            // check first if it has already terminated
            // This should probably be solved better.
            // First, check if it isn't already terminated. If it isn't, evaluate the
            // stopping criteria. If `self.terminate()` is called without the checking
            // whether it has terminated already, then it may overwrite a termination set
            // within `next_iter()`!
            if !self.termination_reason.terminated() {
                self.termination_reason = self.solver.terminate_internal(&self.state);
            }
            // Now check once more if the algorithm has terminated. If yes, then break.
            if self.termination_reason.terminated() {
                break;
            }

            // Start time measurement
            let start = std::time::Instant::now();

            let data = self.solver.next_iter(&mut op_wrapper, self.state)?;

            self.cost_func_count = op_wrapper.cost_func_count;
            self.grad_func_count = op_wrapper.grad_func_count;
            self.hessian_func_count = op_wrapper.hessian_func_count;
            self.modify_func_count = op_wrapper.modify_func_count;

            // End time measurement
            let duration = start.elapsed();

            self.update(&data)?;

            // logging
            let mut log = make_kv!(
                "iter" => self.state.get_iter();
                "best_cost" => self.state.get_best_cost();
                "cur_cost" => self.state.get_cost();
                "cost_func_count" => self.cost_func_count;
                "grad_func_count" => self.grad_func_count;
                "hessian_func_count" => self.hessian_func_count;
                "modify_func_count" => self.modify_func_count;
            );
            if let Some(ref mut iter_log) = data.get_kv() {
                iter_log.push(
                    "time",
                    duration.as_secs() as f64 + duration.subsec_nanos() as f64 * 1e-9,
                );
                log.merge(&mut iter_log.clone());
            }
            self.logger.log_iter(&log)?;

            // Write to file or something
            self.writer.write(
                &self.state.get_param().unwrap(),
                self.state.get_iter(),
                false,
            )?;

            // increment iteration number
            self.state.increment_iter();

            self.checkpoint.store_cond(self, self.state.get_iter())?;

            // Check if termination occured inside next_iter()
            if self.termination_reason.terminated() {
                break;
            }
        }

        // in case it stopped prematurely and `termination_reason` is still `NotTerminated`,
        // someone must have pulled the handbrake
        if self.state.get_iter() < self.state.get_max_iters()
            && !self.termination_reason.terminated()
        {
            self.termination_reason = TerminationReason::Aborted;
        }

        self.total_time = total_time.elapsed();

        let kv = make_kv!(
            "termination_reason" => self.termination_reason;
            "total_time" => self.total_time.as_secs() as f64 +
                            self.total_time.subsec_nanos() as f64 * 1e-9;
        );

        self.logger.log_info(
            &format!(
                "Terminated: {reason}",
                reason = self.termination_reason.text(),
            ),
            &kv,
        )?;

        Ok(ArgminResult::new(
            self.state.get_best_param().unwrap(),
            self.state.get_best_cost().unwrap(),
            self.state.get_iter(),
            self.termination_reason,
        ))
    }

    pub fn run_fast(&mut self) -> Result<ArgminResult<O::Param>, Error> {
        let mut op_wrapper = OpWrapper::new(&self.op);
        let init_data = self.solver.init(&mut op_wrapper, self.state)?;

        // If init() returned something, deal with it
        if let Some(data) = init_data {
            self.update(&data)?;
        }

        // TODO: write a method for this?
        self.cost_func_count = op_wrapper.cost_func_count;
        self.grad_func_count = op_wrapper.grad_func_count;
        self.hessian_func_count = op_wrapper.hessian_func_count;
        self.modify_func_count = op_wrapper.modify_func_count;

        loop {
            // let state = self.to_state();

            // check first if it has already terminated
            // This should probably be solved better.
            // First, check if it isn't already terminated. If it isn't, evaluate the
            // stopping criteria. If `self.terminate()` is called without the checking
            // whether it has terminated already, then it may overwrite a termination set
            // within `next_iter()`!
            if !self.termination_reason.terminated() {
                self.termination_reason = self.solver.terminate_internal(&self.state);
            }
            // Now check once more if the algorithm has terminated. If yes, then break.
            if self.termination_reason.terminated() {
                break;
            }

            let data = self.solver.next_iter(&mut op_wrapper, self.state)?;

            self.cost_func_count = op_wrapper.cost_func_count;
            self.grad_func_count = op_wrapper.grad_func_count;
            self.hessian_func_count = op_wrapper.hessian_func_count;
            self.modify_func_count = op_wrapper.modify_func_count;

            self.update(&data)?;

            // increment iteration number
            self.state.increment_iter();

            self.checkpoint.store_cond(self, self.state.get_iter())?;

            // Check if termination occured inside next_iter()
            if self.termination_reason.terminated() {
                break;
            }
        }

        Ok(ArgminResult::new(
            self.state.get_best_param().unwrap(),
            self.state.get_best_cost().unwrap(),
            self.state.get_iter(),
            self.termination_reason,
        ))
    }

    /// Attaches a logger which implements `ArgminLog` to the solver.
    pub fn add_logger(mut self, logger: std::sync::Arc<ArgminLog>) -> Self {
        self.logger.push(logger);
        self
    }

    pub fn max_iters(mut self, iters: u64) -> Self {
        self.state = self.state.max_iters(iters);
        self
    }

    pub fn target_cost(mut self, cost: f64) -> Self {
        self.state = self.state.target_cost(cost);
        self
    }

    pub fn grad(mut self, grad: O::Param) -> Self {
        self.state = self.state.grad(grad);
        self
    }

    pub fn hessian(mut self, hessian: O::Hessian) -> Self {
        self.state = self.state.hessian(hessian);
        self
    }

    // pub fn to_state(&self) -> IterState<O> {
    //     IterState {
    //         cur_param: self.cur_param.clone(),
    //         prev_param: self.prev_param.clone(),
    //         best_param: self.best_param.clone(),
    //         cur_cost: self.cur_cost,
    //         prev_cost: self.prev_cost,
    //         best_cost: self.best_cost,
    //         target_cost: self.target_cost,
    //         cur_grad: self.cur_grad.clone(),
    //         cur_hessian: self.cur_hessian.clone(),
    //         cur_iter: self.cur_iter,
    //         max_iters: self.max_iters,
    //     }
    // }

    /// Set checkpoint directory
    pub fn checkpoint_dir(mut self, dir: &str) -> Self {
        self.checkpoint.set_dir(dir);
        self
    }

    /// Set checkpoint name
    pub fn checkpoint_name(mut self, dir: &str) -> Self {
        self.checkpoint.set_name(dir);
        self
    }

    pub fn checkpoint_mode(mut self, mode: CheckpointMode) -> Self {
        self.checkpoint.set_mode(mode);
        self
    }
}