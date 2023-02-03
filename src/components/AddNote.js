import React, { useContext } from 'react'
import { useState } from 'react';
import notesContext from "../context/notes/NoteContext"

const AddNote = () => {
    const context = useContext(notesContext);
    const { notes, addNote, setNotes } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const changeHandler = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" onChange={changeHandler} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={changeHandler} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
