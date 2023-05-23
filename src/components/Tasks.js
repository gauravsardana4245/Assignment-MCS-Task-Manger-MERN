import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from "../context/notes/NoteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom"

const Notes = (props) => {
    const context = useContext(notesContext)
    const { notes, getNotes, editNote } = context;
    const { showAlert, mode, setName } = props;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
            async function fetchdata() {
                const response = await fetch("https://inotebook-backend-gaurav-1.onrender.com/api/auth/getuser", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")

                    },
                });
                const json = await response.json();
                console.log(json.name);
                setName(json.name);
            }
            fetchdata();
        }
        else {
            navigate("/login");
        }



    }, [getNotes, navigate, setName])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const ref = useRef(null);
    const ref2 = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const changeHandler = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        console.log("Updating the note...", note)
        editNote(note.etitle, note.edescription, note.etag, note.id)
        // e.preventDefault();
        showAlert(" Note Updated Succesfully", "success");
        ref2.current.click();

    }
    return (
        <>
            <AddNote mode={mode} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className={`modal-content bg-${mode === 'light' ? 'light' : 'dark'}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span style={{ color: `${mode === 'light' ? "black" : 'white'}` }} aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" onChange={changeHandler} value={note.etitle} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" style={{
                                        backgroundColor: `${mode === 'dark' ? "#212529" : 'white'}`,
                                        color: `${mode === 'light' ? "black" : 'white'}`
                                    }} value={note.etag} className="form-control" id="etag" name="etag" onChange={changeHandler} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" ref={ref2} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.edescription.length < 5 || note.etitle.length < 5} onClick={submitHandler} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5 mx-5 container tasks-container'>
                <h2>Your tasks</h2>
                {notes.length === 0 && <div className='container'> No notes to display</div>}
                {notes.map((currentnote) => {
                    return <NoteItem key={Math.random()} updateNote={updateNote} note={currentnote} showAlert={showAlert} mode={mode} />

                })}

            </div>
        </>
    )
}

export default Notes
