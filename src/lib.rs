// Copyright 2018 Stefan Kroboth
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://apache.org/licenses/LICENSE-2.0> or the MIT license <LICENSE-MIT or
// http://opensource.org/licenses/MIT>, at your option. This file may not be
// copied, modified, or distributed except according to those terms.

//! Argmin Optimizaton toolbox
//!
//! TODO: Documentation.

/// Key value datastructure
mod kv;
/// Macros
pub mod macros;
/// Definition of the return type of the solvers
mod result;
/// Definition of termination reasons
mod termination;

pub use kv::ArgminKV;
pub use result::ArgminResult;
pub use termination::TerminationReason;

pub trait ArgminSolver {
    type Parameters;
    fn next_iter(&mut self) -> ArgminIterationData;
    fn run(&mut self) -> ArgminResult<Self::Parameters>;
    fn get_result(&self) -> ArgminResult<Self::Parameters>;

    fn init_log(&self);
    fn log_iter(&self, &ArgminKV);
    fn log_info(&self, &str, &ArgminKV);

    // fn output(&self);

    fn set_termination_reason(&mut self, TerminationReason);
    fn get_termination_reason(&self) -> TerminationReason;
    fn terminated(&self) -> bool;
    fn termination_text(&self) -> &str;
    fn terminate(&mut self) -> TerminationReason;
}

#[derive(Clone)]
pub enum ArgminPostIterationAction {
    OutputCurrent,
    OutputBest,
}

pub trait ArgminLog {
    fn log_info(&self, &str, &ArgminKV);
    fn log_iter(&self, &ArgminKV);
}

pub struct ArgminIterationData {
    output_param: Vec<ArgminPostIterationAction>,
    kv: Option<ArgminKV>,
}

impl ArgminIterationData {
    pub fn new() -> Self {
        ArgminIterationData {
            output_param: vec![],
            kv: None,
        }
    }

    pub fn push_output(&mut self, out: ArgminPostIterationAction) -> &mut Self {
        self.output_param.push(out);
        self
    }

    pub fn output_flags(&self) -> Vec<ArgminPostIterationAction> {
        self.output_param.clone()
    }

    pub fn kv(&mut self, kv: ArgminKV) -> &mut Self {
        self.kv = Some(kv);
        self
    }

    pub fn get_kv(&self) -> &Option<ArgminKV> {
        &self.kv
    }
}
