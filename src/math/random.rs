// Copyright 2018 Stefan Kroboth
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://apache.org/licenses/LICENSE-2.0> or the MIT license <LICENSE-MIT or
// http://opensource.org/licenses/MIT>, at your option. This file may not be
// copied, modified, or distributed except according to those terms.

use crate::math::ArgminRandom;

macro_rules! make_random {
    ($t:ty) => {
        impl ArgminRandom for $t {
            #[inline]
            fn random(min: &Self, max: &Self) -> $t {
                rand::thread_rng().gen_range(min, max) as $t
            }
        }
    };
}

make_random!(f32);
make_random!(f64);
make_random!(i8);
make_random!(i16);
make_random!(i32);
make_random!(i64);
make_random!(u8);
make_random!(u16);
make_random!(u32);
make_random!(u64);
make_random!(isize);
make_random!(usize);

// TODO:  test