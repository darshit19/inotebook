import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

const initialnotes=[
    {
      "_id": "61fc27cfdb201474814ebe48",
      "user": "61fbf7493e28afe06125c073",
      "title": "My Title",
      "description": "Wake up its morning",
      "tag": "personal",
      "date": "2022-02-03T19:06:55.717Z",
      "__v": 0
    }
  ]
  const[notes,setNotes]=useState(initialnotes)
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;