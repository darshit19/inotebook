import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

const initialnotes=[
    {
      "_id": "61fc27cfdb201474814ebe481",
      "user": "61fbf7493e28afe06125c073",
      "title": "My Title",
      "description": "Wake up its morning",
      "tag": "personal",
      "date": "2022-02-03T19:06:55.717Z",
      "__v": 0
    },
    {
        "_id": "62041fa143d2a1fc96ae19c82",
        "user": "61fbf7493e28afe06125c073",
        "title": "My new note",
        "description": "Wake up its early morning",
        "tag": "personal",
        "date": "2022-02-09T20:10:09.304Z",
        "__v": 0
      },{
        "_id": "61fc27cfdb201474814ebe483",
        "user": "61fbf7493e28afe06125c073",
        "title": "My Title",
        "description": "Wake up its morning",
        "tag": "personal",
        "date": "2022-02-03T19:06:55.717Z",
        "__v": 0
      },
      {
          "_id": "62041fa143d2a1fc96ae19c84",
          "user": "61fbf7493e28afe06125c073",
          "title": "My new note",
          "description": "Wake up its early morning",
          "tag": "personal",
          "date": "2022-02-09T20:10:09.304Z",
          "__v": 0
        },{
            "_id": "61fc27cfdb201474814ebe485",
            "user": "61fbf7493e28afe06125c073",
            "title": "My Title",
            "description": "Wake up its morning",
            "tag": "personal",
            "date": "2022-02-03T19:06:55.717Z",
            "__v": 0
          },
          {
              "_id": "62041fa143d2a1fc96ae19c86",
              "user": "61fbf7493e28afe06125c073",
              "title": "My new note",
              "description": "Wake up its early morning",
              "tag": "personal",
              "date": "2022-02-09T20:10:09.304Z",
              "__v": 0
            }
  ]
  const[notes,setNotes]=useState(initialnotes)

//* Add a Note
const addNote=(title,description,tag)=>{
   const note={
    "_id": "62041fa143d2a1143fc96ae19c86",
    "user": "61fbf7493e28afe06125c073",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2022-02-09T20:10:09.304Z",
    "__v": 0
  }
    setNotes(notes.concat(note));
}

//* Delete a Note
const deleteNote=(id)=>{
    console.log("Deleting the note with id : "+id);
    const newNotes=notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
}

//* Edit a Note
const editNote=(id)=>{}

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;