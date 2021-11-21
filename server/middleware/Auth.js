const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Customer = require("../model/customer");
const Seller = require("../model/seller");
const { SECRET } = require("../config");

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
 function URLToArray(url) {
  var request = {};
  var pairs = url.substring(url.indexOf('?') + 1).split('&');
  for (var i = 0; i < pairs.length; i++) {
      if(!pairs[i])
          continue;
      var pair = pairs[i].split('=');
      request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
   }
   return request;
}

const userRegister = async (req, res, next) => {
  
  let params =req.originalUrl.split('/')
  params=params[3]
  try {
    // Validate the username

    let usernameNotTaken = await validateUsername(req.body.Username,params);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }

    // // validate the email
    // let emailNotRegistered = await validateEmail(req.body.Email);
    // if (!emailNotRegistered) {
    //   return res.status(400).json({
    //     message: `Email is already registered.`,
    //     success: false
    //   });
    // }


    // Get the hashed password
    const password = await bcrypt.hash(req.body.Password, 12);
    // create a new user
    req.body["Password"] = password
    next()

  } catch (err) {
    // Implement logger function (winston)
    console.log('hey')
    return res.status(500).json({
      message: "Unable to create your account.",
      success: false
    });
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (req,res) => {
  let role = req.params.role
  let { username, password } = req.body;
  let user;
  if(role==='Seller') {
     user = await Seller.findOne({ AdminUserName : username });
  }
  else if(role==='Customer') {
     user = await Customer.findOne({ AdminUserName : username });
  }
  else {
    return;
  }
  // First Check if the username is in the database
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login credentials.",
      success: false
    });
  }
 
  let isMatch = await bcrypt.compare(password, user.Password);
  if (isMatch) {
    // Sign in the token and issue it to the user

    let token = jwt.sign(
      {
        user_id: user._id,
        username: user.AdminUserName,
        email: user.PersonalDetails.Email
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.AdminUserName,
      email: user.PersonalDetails.Email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async (username,params) => {
  if(params==='Seller') {
    let user = await Seller.findOne({ Username : username });
    return user ? false : true;
  }
  else if(params==='Customer'){
    let user = await Customer.findOne({ Username : username });
    return user ? false : true;
  }
  else{
    return false;
  }
};

/**
 * @DESC Passport middleware
 */
const AuthC = passport.authenticate('Customer','jwt', { session: false });
const AuthS = passport.authenticate('Seller','jwt', { session: false });

/**
 * @DESC Check Role Middleware
 */

const validateEmail = async email => {
  let user = await Customer.findOne({ Email : email });
  return user ? false : true;
};

const serializeUser = req => {
  return {
    Username: req.user.username,
    Email: req.user.email,
    _id: req.user._id,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
  }
}


const updateUser = async (user,req,res) => {
  console.log('trying')
  const id = req.params.username;
  Customer.findOneAndUpdate({Username : id},user)
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Updated")
      }
  })
}

const deleteuser = async (req,res) => {
  const id = req.params.username;
  Customer.findOneAndDelete({Username : id})
  .then((data)=>{
      if(!data) {
        res.status(404).send("Failed")
      }
      else {
        res.status(200).send("Deleted")
      }
  })
}

const GetUserData = async (req,res) => {
  Customer.findOne({Username: req.params.username})
  .then((data)=>{
    if(!data) {
      res.status(404).send("Failed")
    }
    else {
      res.status(200).send(data)
    }
  })
}



const findusers = (req, res) => {
  Customer.find()
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              message:
                err.message ||
                "Error Occurred while retriving Member information",
            });
        });
};


module.exports = {
  AuthC,
  AuthS,
  userLogin,
  userRegister,
  serializeUser,
  updateUser,
  GetUserData,
  deleteuser,
  findusers
};