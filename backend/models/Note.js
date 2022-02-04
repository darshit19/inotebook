const mongoose=require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
         //we have include user because we want to fetch the note with respective user and here this concept is similar like primary key 
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default:"General"
    },
    date:{
        type: Date,
        default:Date.now
    },
  });

  module.exports=mongoose.model('notes',NotesSchema);