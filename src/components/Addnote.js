import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});//for making all inputs empty
        props.showalert("Note added successfully","success");
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Notes</h2>
            </div>
            <div className="container my-3">
                <form method='post'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title </label>
                        <input type="text" value={note.title} className="form-control" id="title" name='title' onChange={onChange} minLength={5} required/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description </label>
                        <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag  </label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} required/>
                    </div>

                    <button disabled={note.title<5 || note.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add a Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
