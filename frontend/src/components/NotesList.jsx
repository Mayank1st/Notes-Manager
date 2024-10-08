import React, { useState } from "react";
import UpdateNotes from "./UpdateNotes";
import { axiosInstance } from "../utils/AxiosInstance"; 

function NotesList({ notesList, updateNotes, deleteNote }) {
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setCurrentNote(null);
  };

  const handleShow = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/notes/${notesList._id}`); 
      deleteNote(notesList._id); 
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <div className="all-notes mt-4 d-flex justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://www.svgrepo.com/show/39674/notes.svg"
            className="card-img-top p-3"
            height={100}
            width={50}
            alt="Notes"
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{notesList.title}</h5>
            <p className="card-text">{notesList.desc}</p>
            <p className="card-text">Due Date: {notesList.dueDate}</p>
            <p className="card-text">Priority: {notesList.priority}</p>
            <div className="mt-auto d-flex justify-content-between">
              <button
                className="btn btn-primary me-2"
                onClick={() => handleShow(notesList)}
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && currentNote && (
        <UpdateNotes
          show={showModal}
          handleClose={handleClose}
          note={currentNote}
          updateNotes={updateNotes}
        />
      )}
    </>
  );
}

export default NotesList;
