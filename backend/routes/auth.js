const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); //I've install express validator middleware for validation //npm install --save express-validator
const bcrypt = require("bcryptjs"); //for password hashing
const jwt = require("jsonwebtoken"); //for creating JWT token which will be given to user
const JWT_SECRET = "darshitisagood$boy"; //this is my signature for jwt token
const fetchuser = require("../middleware/fetchuser");//import fetchuser from middleware folder

//Endpoint for create user
//ROUTE 1 : Create user using: POST "/api/auth/createuser".No log in require
router.post(
  "/createuser",
  [
    body("name", "Please Enter a valid name").isLength({ min: 2 }),
    body("email", "Please enter a valid mail").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    let success=false;
    //If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the user with this email exists already
      //I wrapped it into try catch block because if any other error will come rather  than the email exists or not then we cant't allow to continue
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res.status(400).json({ success,error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //if email is not already exist then we create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, //we are getting password from this variable as we use hashing concept for password
      });

      //this will create token
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({ success,authToken });//token created till here
      // res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// console.log(req.body);
//we can also create user like this but above metho is preferable
//const user=User(req.body);
//user.save();
//res.send(req.body);

//this can use if we don't use async function
// .then(user => res.json(user))
// .catch(err=>{console.log(err)
// res.json({error:"Please Enter a unique value for email",
// message:err.message  })});


//Endpoint for login
//ROUTE 2 : Authenticate user using POST "/api/auth/login".No log in require
router.post(
  "/login",
  [
    body("email", "Please enter a valid mail").isEmail(),
    body("password", "Password can not be blank").exists()//exists() function will check if its value is null or not
  ], async (req, res) => {
    let success = false;

    //If there are errors,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });//we are finding user with our User model
      if (!user) {
        success = false;
        return res.json({ success, error: "Please try to log in with correct Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.json({ success, error: "Please try to log in with correct Credentials" });
      }

      //this will create a token
      const data = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });//token created till here

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }

  })

//ROUTE 3 : Get loggedin user details using : POST "/api/auth/getuser" .Login required
//In this token we need to create middleware -'fetchuser' because here we need user to loggedin so we will check user's token and if it's valid then and only then we will provide information otherwise we will deny access .So here fetchuser is middleware
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }

  })

module.exports = router;