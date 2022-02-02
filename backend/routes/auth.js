
const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');


//Create user using: POST "/api/auth".Doesen't require authentication
router.post('/',[
    body('name','Please Enter a valid name').isLength({ min: 2 }),
    body('email','Please enter a valid mail').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),

],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
    res.json({error:"Please Enter a unique value for email",
              message:err.message  })});
})
module.exports=router

// console.log(req.body);
//  we can also create user like this but above metho is preferable
//     const user=User(req.body);
//     user.save();
//     res.send(req.body);