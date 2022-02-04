//whenever we will create schema we need to import mongoose and schema
const mongoose=require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default:Date.now
    },
  });

  //we need to export our schema for use 
const User=mongoose.model('user',UserSchema);//here 'user'=modelname UserSchema=Our schema
module.exports=User;

  //module.exports=mongoose.model('user',UserSchema);
  //we can also export our schema like this in this method declaration of variable 'user' isn't required