import { React, useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import NoteState from '../context/notes/NoteState';

const Notes = (props) => {
  const {showalert}=props;
  const context = useContext(noteContext);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});

  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    getNotes();
  }, [])

  const ref = useRef(null);
  const refClose=useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  }

  const handleClick = (e) => {
    e.preventDefault();
   // console.log("Updatenig Note...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    showalert("Note updated successfully","success");
    refClose.current.click();
  // updateNote(note.etitle,note.edescription,note.dtag);
}

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <Addnote showalert={showalert} />


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title </label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required/>

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description </label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag  </label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle<5 || note.edescription<5} type="submit"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && 'Nothing to display for now'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} showalert={showalert} />
        })}
      </div>
    </>
  )
}

export default Notes
