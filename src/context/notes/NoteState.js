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
    },
    {
        "_id": "62041fa143d2a1fc96ae19c8",
        "user": "61fbf7493e28afe06125c073",
        "title": "My new note",
        "description": "Wake up its early morning",
        "tag": "personal",
        "date": "2022-02-09T20:10:09.304Z",
        "__v": 0
      },{
        "_id": "61fc27cfdb201474814ebe48",
        "user": "61fbf7493e28afe06125c073",
        "title": "My Title",
        "description": "Wake up its morning",
        "tag": "personal",
        "date": "2022-02-03T19:06:55.717Z",
        "__v": 0
      },
      {
          "_id": "62041fa143d2a1fc96ae19c8",
          "user": "61fbf7493e28afe06125c073",
          "title": "My new note",
          "description": "Wake up its early morning",
          "tag": "personal",
          "date": "2022-02-09T20:10:09.304Z",
          "__v": 0
        },{
            "_id": "61fc27cfdb201474814ebe48",
            "user": "61fbf7493e28afe06125c073",
            "title": "My Title",
            "description": "Wake up its morning",
            "tag": "personal",
            "date": "2022-02-03T19:06:55.717Z",
            "__v": 0
          },
          {
              "_id": "62041fa143d2a1fc96ae19c8",
              "user": "61fbf7493e28afe06125c073",
              "title": "My new note",
              "description": "Wake up its early morning",
              "tag": "personal",
              "date": "2022-02-09T20:10:09.304Z",
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