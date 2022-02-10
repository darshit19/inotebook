import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialnotes = []
    const [notes, setNotes] = useState(initialnotes)

//* Get all notes
    const getNotes =async () => {
        //* API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYmY3NDkzZTI4YWZlMDYxMjVjMDczIn0sImlhdCI6MTY0MzkwNzk4M30.yoM8fIjRfJ-iyR6EiKaFPljbM5cApmR4Nh7EMlVAAxw'
            },

        });
        const json=await response.json();
        console.log(json);

        //*Client side logic
        setNotes(json);
    }

    //* Add a Note
    const addNote =async (title, description, tag) => {
        //* API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYmY3NDkzZTI4YWZlMDYxMjVjMDczIn0sImlhdCI6MTY0MzkwNzk4M30.yoM8fIjRfJ-iyR6EiKaFPljbM5cApmR4Nh7EMlVAAxw'
            },

            body: JSON.stringify(title,description,tag)
        });
       
        //*CLIENT SIDE LOGIC
        const note = {
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
    const deleteNote = (id) => {

        //* CLIENT SIDE LOGIC
        console.log("Deleting the note with id : " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    //* Edit a Note
    const editNote = async (id, title, description, tag) => {

        //*API  CALL

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmYmY3NDkzZTI4YWZlMDYxMjVjMDczIn0sImlhdCI6MTY0MzkwNzk4M30.yoM8fIjRfJ-iyR6EiKaFPljbM5cApmR4Nh7EMlVAAxw'
            },

            body: JSON.stringify(title,description,tag)
        });
        const json = response.json();

        //* CLIENT SIDE LOGIC
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;

