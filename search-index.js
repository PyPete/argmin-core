var N = null;var searchIndex = {};
searchIndex["argmin_core"]={"doc":"Argmin Optimizaton toolbox core","items":[[3,"Error","argmin_core","The `Error` type, which can contain any failure.",N,N],[3,"ArgminBase","","Storage for data needed by most solvers",N,N],[3,"ArgminKV","","A simple key-value storage",N,N],[12,"kv","","The actual key value storage",0,N],[3,"ArgminSlogLogger","","A logger based on `slog`",N,N],[3,"ArgminLogger","","Container for `ArgminLog`gers",N,N],[3,"WriteToFile","","",N,N],[3,"ArgminWriter","","",N,N],[3,"ArgminResult","","Return struct for all solvers.",N,N],[12,"param","","Final parameter vector",1,N],[12,"cost","","Final cost value",1,N],[12,"iters","","Number of iterations",1,N],[12,"terminated","","Indicated whether it terminated or not",1,N],[12,"termination_reason","","Reason of termination",1,N],[3,"ArgminIterationData","","The datastructure which is returned by the `next_iter` method of the `ArgminNextIter` trait.",N,N],[3,"NoOperator","","",N,N],[4,"ArgminError","","",N,N],[13,"InvalidParameter","","Indicates and invalid parameter",2,N],[12,"text","argmin_core::ArgminError","",2,N],[13,"NotImplemented","argmin_core","Indicates that a function is not implemented",2,N],[12,"text","argmin_core::ArgminError","",2,N],[13,"NotInitialized","argmin_core","Indicates that a function is not initialized",2,N],[12,"text","argmin_core::ArgminError","",2,N],[13,"ConditionViolated","argmin_core","Indicates that a condition is violated",2,N],[12,"text","argmin_core::ArgminError","",2,N],[13,"ImpossibleError","argmin_core","Indicates an impossible error",2,N],[12,"text","argmin_core::ArgminError","",2,N],[4,"TerminationReason","argmin_core","Indicates why the optimization algorithm stopped",N,N],[13,"NotTerminated","","In case it has not terminated yet",3,N],[13,"MaxItersReached","","Maximum number of iterations reached",3,N],[13,"TargetCostReached","","Target cost function value reached",3,N],[13,"TargetPrecisionReached","","Target precision reached",3,N],[13,"AcceptedStallIterExceeded","","Acceped stall iter exceeded",3,N],[13,"BestStallIterExceeded","","Best stall iter exceeded",3,N],[13,"LineSearchConditionMet","","Condition for Line search met",3,N],[13,"Aborted","","Aborted",3,N],[0,"macros","","Macros # Macros",N,N],[11,"new","","Constructor",4,[[["box",["argminoperator"]],["t"]],["self"]]],[11,"kv_for_logs","","Return the KV for the initial logging",4,[[["self"]],["argminkv"]]],[11,"kv_for_iter","","Return the KV for logging of the iterations",4,[[["self"]],["argminkv"]]],[11,"reset","","Reset `self` to its initial state.",4,[[["self"]]]],[11,"operator","","Return the operator (TODO: Check if this is still necessary!)",4,[[["self"]],["box"]]],[11,"apply","","Apply the operator to `param`",4,[[["self"],["t"]],["result",["error"]]]],[11,"gradient","","Compute the gradient at `param`",4,[[["self"],["t"]],["result",["error"]]]],[11,"hessian","","Compute the hessian at `param`",4,[[["self"],["t"]],["result",["error"]]]],[11,"modify","","Modify a `param` with the `modify` method of `operator`.",4,[[["self"],["t"],["f64"]],["result",["error"]]]],[11,"set_cur_param","","Set the current parameter vector",4,[[["self"],["t"]],["self"]]],[11,"cur_param","","Return the current parameter vector",4,[[["self"]],["t"]]],[11,"set_best_param","","Set the new best parameter vector",4,[[["self"],["t"]],["self"]]],[11,"best_param","","Return the current best parameter vector",4,[[["self"]],["t"]]],[11,"set_cur_cost","","Set the current cost function value",4,[[["self"],["f64"]],["self"]]],[11,"cur_cost","","Return the current cost function value",4,[[["self"]],["f64"]]],[11,"set_best_cost","","Set the cost function value of the current best parameter vector",4,[[["self"],["f64"]],["self"]]],[11,"best_cost","","Return the cost function value of the current best parameter vector",4,[[["self"]],["f64"]]],[11,"set_cur_grad","","Set the current gradient",4,[[["self"],["t"]],["self"]]],[11,"cur_grad","","Return the current gradient",4,[[["self"]],["t"]]],[11,"set_cur_hessian","","Set the current hessian",4,[[["self"],["h"]],["self"]]],[11,"cur_hessian","","Return the current hessian",4,[[["self"]],["h"]]],[11,"set_target_cost","","Set the target cost function value",4,[[["self"],["f64"]],["self"]]],[11,"target_cost","","Return the target cost function value",4,[[["self"]],["f64"]]],[11,"increment_iter","","Increment the number of iterations.",4,[[["self"]],["self"]]],[11,"cur_iter","","Return the current number of iterations",4,[[["self"]],["u64"]]],[11,"increment_cost_func_count","","Increment the cost function evaluation count",4,[[["self"]],["self"]]],[11,"cost_func_count","","Return the cost function evaluation count",4,[[["self"]],["u64"]]],[11,"increment_grad_func_count","","Increment the gradient evaluation count",4,[[["self"]],["self"]]],[11,"grad_func_count","","Return the gradient evaluation count",4,[[["self"]],["u64"]]],[11,"increment_hessian_func_count","","Increment the hessian evaluation count",4,[[["self"]],["self"]]],[11,"hessian_func_count","","Return the gradient evaluation count",4,[[["self"]],["u64"]]],[11,"set_max_iters","","Set the maximum number of iterations.",4,[[["self"],["u64"]],["self"]]],[11,"max_iters","","Return the maximum number of iterations",4,[[["self"]],["u64"]]],[11,"set_termination_reason","","Set the `TerminationReason`",4,[[["self"],["terminationreason"]],["self"]]],[11,"termination_reason","","Return the `TerminationReason`",4,[[["self"]],["terminationreason"]]],[11,"termination_reason_text","","Return the textual representation of the `TerminationReason`",4,[[["self"]],["str"]]],[11,"terminated","","Return whether the algorithm has terminated or not",4,[[["self"]],["bool"]]],[11,"result","","Return the result.",4,[[["self"]],["argminresult"]]],[11,"set_total_time","","Set the total time needed by the solver",4,[[["self"],["duration"]],["self"]]],[11,"total_time","","Return the total time",4,[[["self"]],["duration"]]],[11,"add_logger","","Add a logger to the list of loggers",4,[[["self"],["box",["argminlog"]]],["self"]]],[11,"add_writer","","Add a writer to the list of writers",4,[[["self"],["box",["argminwrite"]]],["self"]]],[11,"log_iter","","Log a `kv`",4,[[["self"],["argminkv"]],["result",["error"]]]],[11,"log_info","","Log a message and a `kv`",4,[[["self"],["str"],["argminkv"]],["result",["error"]]]],[11,"write","","Write (TODO)",4,[[["self"],["t"]],["result",["error"]]]],[11,"new","","Constructor",0,[[],["self"]]],[11,"push","","Push a key-value pair to the `kv` vector.",0,[[["self"],["str"],["t"]],["self"]]],[11,"merge","","Merge another `kv` into `self.kv`",0,[[["self"],["argminkv"]],["self"]]],[11,"term","","Log to the terminal in a blocking way",5,[[],["box"]]],[11,"term_noblock","","Log to the terminal in a non-blocking way (in case of overflow, messages are dropped)",5,[[],["box"]]],[11,"file","","Log JSON to a file in a blocking way",5,[[["str"]],["result",["box","error"]]]],[11,"file_noblock","","Log JSON to a file in a non-blocking way (in case of overflow, messages are dropped)",5,[[["str"]],["result",["box","error"]]]],[11,"new","","Constructor",6,[[],["self"]]],[11,"push","","Push another `ArgminLog` to the `logger` field",6,[[["self"],["box",["argminlog"]]],["self"]]],[11,"new","","",7,[[],["box"]]],[11,"new","","",8,[[],["self"]]],[11,"push","","",8,[[["self"],["box",["argminwrite"]]],["self"]]],[11,"new","","Constructor",1,[[["t"],["f64"],["u64"],["terminationreason"]],["self"]]],[11,"terminated","","Returns `true` if a solver terminated and `false` otherwise",3,[[["self"]],["bool"]]],[11,"text","","Returns a texual representation of what happened",3,[[["self"]],["str"]]],[8,"ArgminDot","","Dot/scalar product of `T` and `self`",N,N],[10,"dot","","Dot/scalar product of `T` and `self`",9,[[["self"],["t"]],["u"]]],[8,"ArgminWeightedDot","","Dot/scalar product of `T` and `self` weighted by W (p^TWv)",N,N],[10,"weighted_dot","","Dot/scalar product of `T` and `self`",10,[[["self"],["v"],["t"]],["u"]]],[8,"ArgminZero","","Return param vector of all zeros (for now, this is a hack. It should be done better)",N,N],[10,"zero","","Return param vector of all zeros",11,[[["self"]],["self"]]],[8,"ArgminAdd","","Add a `T` to `self`",N,N],[10,"add","","Add a `T` to `self`",12,[[["self"],["t"]],["self"]]],[8,"ArgminSub","","Subtract a `T` from `self`",N,N],[10,"sub","","Subtract a `T` from `self`",13,[[["self"],["t"]],["self"]]],[8,"ArgminScaledAdd","","Add a `T` scaled by an `U` to `self`",N,N],[10,"scaled_add","","Add a `T` scaled by an `U` to `self`",14,[[["self"],["u"],["t"]],["self"]]],[8,"ArgminScaledSub","","Subtract a `T` scaled by an `U` from `self`",N,N],[10,"scaled_sub","","Subtract a `T` scaled by an `U` from `self`",15,[[["self"],["u"],["t"]],["self"]]],[8,"ArgminScale","","Scale `self` by a `U`",N,N],[10,"scale","","Scale `self` by a `U`",16,[[["self"],["u"]],["self"]]],[8,"ArgminNorm","","Compute the l2-norm (`U`) of `self`",N,N],[10,"norm","","Compute the l2-norm (`U`) of `self`",17,[[["self"]],["u"]]],[8,"ArgminInv","","Compute the inverse (`T`) of `self`",N,N],[10,"ainv","","",18,[[["self"]],["result",["error"]]]],[8,"ArgminSolver","","Defines the interface to a solver. Usually, there is no need to implement this manually, use the `argmin_derive` crate instead.",N,N],[10,"apply","","apply cost function or operator to a parameter vector",19,N],[10,"gradient","","compute the gradient for a parameter vector",19,N],[10,"hessian","","compute the hessian for a parameter vector",19,N],[10,"modify","","modify the parameter vector",19,N],[10,"cur_param","","return current parameter vector",19,N],[10,"cur_grad","","return current gradient",19,N],[10,"cur_hessian","","return current gradient",19,N],[10,"set_cur_param","","set current parameter vector",19,N],[10,"set_cur_grad","","set current gradient",19,N],[10,"set_cur_hessian","","set current gradient",19,N],[10,"set_best_param","","set current parameter vector",19,N],[10,"run","","Execute the optimization algorithm.",19,[[["self"]],["result",["argminresult","error"]]]],[10,"run_fast","","Execute the optimization algorithm without Ctrl-C handling, logging, writing and anything else which may cost unnecessary time.",19,[[["self"]],["result",["argminresult","error"]]]],[10,"result","","Returns the best solution found during optimization.",19,[[["self"]],["argminresult"]]],[10,"set_termination_reason","","Set termination reason (doesn't terminate yet! -- this is helpful for terminating within the iterations)",19,[[["self"],["terminationreason"]]]],[10,"terminate","","Evaluate all stopping criterions and return the `TerminationReason`",19,[[["self"]],["terminationreason"]]],[10,"set_max_iters","","Set max number of iterations.",19,[[["self"],["u64"]]]],[10,"max_iters","","Get max number of iterations.",19,[[["self"]],["u64"]]],[10,"cur_iter","","Get current iteration number.",19,[[["self"]],["u64"]]],[10,"cur_cost","","Get current cost function value",19,[[["self"]],["f64"]]],[10,"set_cur_cost","","Get current cost function value",19,[[["self"],["f64"]]]],[10,"best_cost","","Get best cost function value",19,[[["self"]],["f64"]]],[10,"set_best_cost","","set best cost value",19,[[["self"],["f64"]]]],[10,"set_target_cost","","Set the target cost function value which is used as a stopping criterion",19,[[["self"],["f64"]]]],[10,"add_logger","","Add a logger to the array of loggers",19,[[["self"],["box",["argminlog"]]]]],[10,"add_writer","","Add a writer to the array of writers",19,[[["self"],["box",["argminwrite"]]]]],[10,"base_reset","","Reset the base of the algorithm to its initial state",19,[[["self"]]]],[8,"ArgminNextIter","","Main part of every solver: `next_iter` computes one iteration of the algorithm and `init` is executed before these iterations. The `init` method comes with a default implementation which corresponds to doing nothing.",N,N],[16,"Parameters","","Parameter vectors",20,N],[16,"OperatorOutput","","Output of the operator",20,N],[16,"Hessian","","Hessian",20,N],[10,"next_iter","","Computes one iteration of the algorithm.",20,[[["self"]],["result",["argminiterationdata","error"]]]],[11,"init","","Initializes the algorithm",20,[[["self"]],["result",["error"]]]],[8,"ArgminLog","","Defince the interface every logger needs to expose",N,N],[10,"log_info","","Logs general information (a message `msg` and/or key-value pairs `kv`).",21,[[["self"],["str"],["argminkv"]],["result",["error"]]]],[10,"log_iter","","Logs information from iterations. Only accepts key-value pairs. `log_iter` is made to log to a database or a CSV file. Therefore the structure of the key-value pairs should not change inbetween iterations.",21,[[["self"],["argminkv"]],["result",["error"]]]],[8,"ArgminWrite","","Every writer (which is something that writes parameter vectors somewhere after each iteration) needs to implement this.",N,N],[16,"Param","","",22,N],[10,"write","","Writes the parameter vector somewhere",22,N],[8,"ArgminOperator","","This trait needs to be implemented for every operator/cost function.",N,N],[16,"Parameters","","Type of the parameter vector",23,N],[16,"OperatorOutput","","Output of the operator. Most solvers expect `f64`.",23,N],[16,"Hessian","","Type of Hessian",23,N],[10,"apply","","Applies the operator/cost function to parameters",23,N],[11,"gradient","","Computes the gradient at the given parameters",23,N],[11,"hessian","","Computes the hessian at the given parameters",23,N],[11,"modify","","Modifies a parameter vector. Comes with a variable that indicates the \"degree\" of the modification.",23,N],[10,"box_clone","","Allows to clone the boxed trait object.",23,[[["self"]],["box",["argminoperator"]]]],[8,"ArgminLineSearch","","Defines a common interface to line search methods. Requires that `ArgminSolver` is implemented for the line search method as well.",N,N],[10,"set_initial_parameter","","Set the initial parameter (starting point)",24,N],[10,"set_search_direction","","Set the search direction",24,N],[10,"set_initial_alpha","","Set the initial step length",24,[[["self"],["f64"]],["result",["error"]]]],[10,"set_initial_cost","","Set the cost function value at the starting point as opposed to computing it (see `calc_initial_cost`)",24,[[["self"],["f64"]]]],[10,"set_initial_gradient","","Set the gradient at the starting point as opposed to computing it (see `calc_initial_gradient`)",24,N],[10,"calc_initial_cost","","calculate the initial cost function value using an operator as opposed to setting it manually (see `set_initial_cost`)",24,[[["self"]],["result",["error"]]]],[10,"calc_initial_gradient","","calculate the initial gradient using an operator as opposed to setting it manually (see `set_initial_gradient`)",24,[[["self"]],["result",["error"]]]],[8,"ArgminTrustRegion","","Defines a common interface to methods which calculate approximate steps for trust region methods. Requires that `ArgminSolver` is implemented as well.",N,N],[10,"set_radius","","Set the initial step length",25,[[["self"],["f64"]]]],[10,"set_grad","","Set the gradient at the starting point",25,N],[10,"set_hessian","","Set the gradient at the starting point",25,N],[8,"ArgminNLCGBetaUpdate","","Every method for the update of beta needs to implement this trait.",N,N],[10,"update","","Update beta Parameter 1: \\nabla f_k Parameter 2: \\nabla f_{k+1} Parameter 3: p_k",26,[[["self"],["t"],["t"],["t"]],["f64"]]],[11,"new","","Constructor",27,[[["t"],["f64"]],["self"]]],[11,"param","","Returns the parameter vector",27,[[["self"]],["t"]]],[11,"cost","","Returns the cost function value",27,[[["self"]],["f64"]]],[11,"add_kv","","Adds an `ArgminKV`",27,[[["self"],["argminkv"]],["self"]]],[11,"get_kv","","Returns an `ArgminKV`",27,[[["self"]],["option",["argminkv"]]]],[11,"new","","",28,[[],["self"]]],[14,"box_clone","","Implements the `box_clone` method of the `ArgminOperator` trait in order to be able to clone a `Box<ArgminOperator>`.",N,N],[14,"make_kv","","Creates an `ArgminKV` at compile time in order to avoid pushing to the `kv` vector.",N,N],[14,"check_param","","Release an `T` from an `Option<T>` if it is not `None`. If it is `None`, return an `ArgminError` with a message that needs to be provided.",N,N],[11,"into","","",29,[[["self"]],["u"]]],[11,"to_string","","",29,[[["self"]],["string"]]],[11,"from","","",29,[[["t"]],["t"]]],[11,"try_from","","",29,[[["u"]],["result"]]],[11,"borrow","","",29,[[["self"]],["t"]]],[11,"borrow_mut","","",29,[[["self"]],["t"]]],[11,"try_into","","",29,[[["self"]],["result"]]],[11,"get_type_id","","",29,[[["self"]],["typeid"]]],[11,"as_fail","","",29,[[["self"]],["fail"]]],[11,"into","","",4,[[["self"]],["u"]]],[11,"from","","",4,[[["t"]],["t"]]],[11,"try_from","","",4,[[["u"]],["result"]]],[11,"borrow","","",4,[[["self"]],["t"]]],[11,"borrow_mut","","",4,[[["self"]],["t"]]],[11,"try_into","","",4,[[["self"]],["result"]]],[11,"get_type_id","","",4,[[["self"]],["typeid"]]],[11,"into","","",0,[[["self"]],["u"]]],[11,"to_owned","","",0,[[["self"]],["t"]]],[11,"clone_into","","",0,N],[11,"from","","",0,[[["t"]],["t"]]],[11,"try_from","","",0,[[["u"]],["result"]]],[11,"borrow","","",0,[[["self"]],["t"]]],[11,"borrow_mut","","",0,[[["self"]],["t"]]],[11,"try_into","","",0,[[["self"]],["result"]]],[11,"get_type_id","","",0,[[["self"]],["typeid"]]],[11,"into","","",5,[[["self"]],["u"]]],[11,"from","","",5,[[["t"]],["t"]]],[11,"try_from","","",5,[[["u"]],["result"]]],[11,"borrow","","",5,[[["self"]],["t"]]],[11,"borrow_mut","","",5,[[["self"]],["t"]]],[11,"try_into","","",5,[[["self"]],["result"]]],[11,"get_type_id","","",5,[[["self"]],["typeid"]]],[11,"into","","",6,[[["self"]],["u"]]],[11,"from","","",6,[[["t"]],["t"]]],[11,"try_from","","",6,[[["u"]],["result"]]],[11,"borrow","","",6,[[["self"]],["t"]]],[11,"borrow_mut","","",6,[[["self"]],["t"]]],[11,"try_into","","",6,[[["self"]],["result"]]],[11,"get_type_id","","",6,[[["self"]],["typeid"]]],[11,"into","","",7,[[["self"]],["u"]]],[11,"from","","",7,[[["t"]],["t"]]],[11,"try_from","","",7,[[["u"]],["result"]]],[11,"borrow","","",7,[[["self"]],["t"]]],[11,"borrow_mut","","",7,[[["self"]],["t"]]],[11,"try_into","","",7,[[["self"]],["result"]]],[11,"get_type_id","","",7,[[["self"]],["typeid"]]],[11,"into","","",8,[[["self"]],["u"]]],[11,"from","","",8,[[["t"]],["t"]]],[11,"try_from","","",8,[[["u"]],["result"]]],[11,"borrow","","",8,[[["self"]],["t"]]],[11,"borrow_mut","","",8,[[["self"]],["t"]]],[11,"try_into","","",8,[[["self"]],["result"]]],[11,"get_type_id","","",8,[[["self"]],["typeid"]]],[11,"into","","",1,[[["self"]],["u"]]],[11,"to_owned","","",1,[[["self"]],["t"]]],[11,"clone_into","","",1,N],[11,"from","","",1,[[["t"]],["t"]]],[11,"try_from","","",1,[[["u"]],["result"]]],[11,"borrow","","",1,[[["self"]],["t"]]],[11,"borrow_mut","","",1,[[["self"]],["t"]]],[11,"try_into","","",1,[[["self"]],["result"]]],[11,"get_type_id","","",1,[[["self"]],["typeid"]]],[11,"into","","",27,[[["self"]],["u"]]],[11,"from","","",27,[[["t"]],["t"]]],[11,"try_from","","",27,[[["u"]],["result"]]],[11,"borrow","","",27,[[["self"]],["t"]]],[11,"borrow_mut","","",27,[[["self"]],["t"]]],[11,"try_into","","",27,[[["self"]],["result"]]],[11,"get_type_id","","",27,[[["self"]],["typeid"]]],[11,"into","","",28,[[["self"]],["u"]]],[11,"to_owned","","",28,[[["self"]],["t"]]],[11,"clone_into","","",28,N],[11,"from","","",28,[[["t"]],["t"]]],[11,"try_from","","",28,[[["u"]],["result"]]],[11,"borrow","","",28,[[["self"]],["t"]]],[11,"borrow_mut","","",28,[[["self"]],["t"]]],[11,"try_into","","",28,[[["self"]],["result"]]],[11,"get_type_id","","",28,[[["self"]],["typeid"]]],[11,"into","","",2,[[["self"]],["u"]]],[11,"to_string","","",2,[[["self"]],["string"]]],[11,"from","","",2,[[["t"]],["t"]]],[11,"try_from","","",2,[[["u"]],["result"]]],[11,"borrow","","",2,[[["self"]],["t"]]],[11,"borrow_mut","","",2,[[["self"]],["t"]]],[11,"try_into","","",2,[[["self"]],["result"]]],[11,"get_type_id","","",2,[[["self"]],["typeid"]]],[11,"as_fail","","",2,[[["self"]],["fail"]]],[11,"into","","",3,[[["self"]],["u"]]],[11,"to_owned","","",3,[[["self"]],["t"]]],[11,"clone_into","","",3,N],[11,"from","","",3,[[["t"]],["t"]]],[11,"try_from","","",3,[[["u"]],["result"]]],[11,"borrow","","",3,[[["self"]],["t"]]],[11,"borrow_mut","","",3,[[["self"]],["t"]]],[11,"try_into","","",3,[[["self"]],["result"]]],[11,"get_type_id","","",3,[[["self"]],["typeid"]]],[11,"fmt","","",29,[[["self"],["formatter"]],["result",["error"]]]],[11,"fmt","","",29,[[["self"],["formatter"]],["result",["error"]]]],[11,"as_fail","","",29,[[["self"]],["fail"]]],[11,"as_ref","","",29,[[["self"]],["fail"]]],[11,"from","","",29,[[["f"]],["error"]]],[11,"log_info","","Log general info",5,[[["self"],["str"],["argminkv"]],["result",["error"]]]],[11,"log_iter","","This should be used to log iteration data only (because this is what may be saved in a CSV file or a database)",5,[[["self"],["argminkv"]],["result",["error"]]]],[11,"log_info","","Log general info",6,[[["self"],["str"],["argminkv"]],["result",["error"]]]],[11,"log_iter","","This should be used to log iteration data only (because this is what may be saved in a CSV file or a database)",6,[[["self"],["argminkv"]],["result",["error"]]]],[11,"write","","",7,[[["self"],["t"]],["result",["error"]]]],[11,"write","","",8,[[["self"],["t"]],["result",["error"]]]],[11,"apply","","",28,N],[11,"gradient","","",28,N],[11,"hessian","","",28,N],[11,"modify","","",28,N],[11,"box_clone","","",28,[[["self"]],["box",["argminoperator"]]]],[11,"eq","","",3,[[["self"],["terminationreason"]],["bool"]]],[11,"clone","","",0,[[["self"]],["argminkv"]]],[11,"clone","","",1,[[["self"]],["argminresult"]]],[11,"clone","","",3,[[["self"]],["terminationreason"]]],[11,"clone","","",28,[[["self"]],["nooperator"]]],[11,"fmt","","",2,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",1,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",3,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",2,[[["self"],["formatter"]],["result"]]],[11,"cause","","",2,[[["self"]],["option",["fail"]]]],[11,"backtrace","","",2,[[["self"]],["option",["backtrace"]]]],[11,"from_boxed_compat","","Creates an `Error` from `Box<std::error::Error>`.",29,[[["box",["error"]]],["error"]]],[11,"as_fail","","Return a reference to the underlying failure that this `Error` contains.",29,[[["self"]],["fail"]]],[11,"cause","","Returns a reference to the underlying cause of this `Error`. Unlike the method on `Fail`, this does not return an `Option`. The `Error` type always has an underlying failure.",29,[[["self"]],["fail"]]],[11,"backtrace","","Gets a reference to the `Backtrace` for this `Error`.",29,[[["self"]],["backtrace"]]],[11,"context","","Provides context for this `Error`.",29,[[["self"],["d"]],["context"]]],[11,"compat","","Wraps `Error` in a compatibility type.",29,[[["self"]],["compat",["error"]]]],[11,"downcast","","Attempts to downcast this `Error` to a particular `Fail` type.",29,[[["self"]],["result",["error"]]]],[11,"find_root_cause","","Returns the \"root cause\" of this error - the last value in the cause chain which does not return an underlying `cause`.",29,[[["self"]],["fail"]]],[11,"iter_causes","","Returns a iterator over the causes of this error with the cause of the fail as the first item and the `root_cause` as the final item.",29,[[["self"]],["causes"]]],[11,"iter_chain","","Returns a iterator over all fails up the chain from the current as the first item up to the `root_cause` as the final item.",29,[[["self"]],["causes"]]],[11,"downcast_ref","","Attempts to downcast this `Error` to a particular `Fail` type by reference.",29,[[["self"]],["option"]]],[11,"downcast_mut","","Attempts to downcast this `Error` to a particular `Fail` type by mutable reference.",29,[[["self"]],["option"]]],[11,"root_cause","","Deprecated alias to `find_root_cause`.",29,[[["self"]],["fail"]]],[11,"causes","","Deprecated alias to `iter_causes`.",29,[[["self"]],["causes"]]]],"paths":[[3,"ArgminKV"],[3,"ArgminResult"],[4,"ArgminError"],[4,"TerminationReason"],[3,"ArgminBase"],[3,"ArgminSlogLogger"],[3,"ArgminLogger"],[3,"WriteToFile"],[3,"ArgminWriter"],[8,"ArgminDot"],[8,"ArgminWeightedDot"],[8,"ArgminZero"],[8,"ArgminAdd"],[8,"ArgminSub"],[8,"ArgminScaledAdd"],[8,"ArgminScaledSub"],[8,"ArgminScale"],[8,"ArgminNorm"],[8,"ArgminInv"],[8,"ArgminSolver"],[8,"ArgminNextIter"],[8,"ArgminLog"],[8,"ArgminWrite"],[8,"ArgminOperator"],[8,"ArgminLineSearch"],[8,"ArgminTrustRegion"],[8,"ArgminNLCGBetaUpdate"],[3,"ArgminIterationData"],[3,"NoOperator"],[3,"Error"]]};
initSearch(searchIndex);
