const Customer = require("../model/customer");
const Seller = require("../model/seller");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Executive = require("../model/executive");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passportC => {
  passportC.use('Customer',new Strategy(opts, async (payload, done) => {
      await Customer.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};

module.exports = passportS => {
  passportS.use('Seller', new Strategy(opts, async (payload, done) => {
    console.log(done)
      await Seller.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};
module.exports = passportE => {
  passportE.use('Executive', new Strategy(opts, async (payload, done) => {
    console.log(done)
      await Executive.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
};

