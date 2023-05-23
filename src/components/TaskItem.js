import React, { useContext } from 'react'
import notesContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const { note, updateNote, mode } = props;

    const context = useContext(notesContext);
    const { deleteNote } = context;

    return (
        <div className={`col-md-3 my-3`}>
            <div className={`card my-3 bg-${mode === 'light' ? 'light' : 'dark'}`} >
                <div className="card-body">
                    <h5 className={`card-title `}>{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note Deleted Succesfully", "success"); }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
