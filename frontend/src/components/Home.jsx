import React, { useEffect, useState } from "react";
import NotesList from "./NotesList";
import AddNotes from "./AddNotes";
import { axiosInstance } from "../utils/AxiosInstance";

function Home() {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        setNotesList(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllNotes();
  }, []);

  const updateNotes = (updatedNote) => {
    setNotesList((prevNotes) =>
      prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  const addNote = (newNote) => {
    setNotesList((prevNotes) => [...prevNotes, newNote]); // Append the new note
  };

  const deleteNote = (noteId) => {
    setNotesList((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  };

  return (
    <>
      <div className="hero container mt-4">
        <h1 className="display-4 text-center">Notes</h1>
        <hr />
        <div className="d-flex flex-wrap justify-content-center gap-4"> 
          {notesList.map((ele) => (
            <NotesList key={ele._id} notesList={ele} updateNotes={updateNotes} deleteNote={deleteNote} />
          ))}
        </div>
      </div>

      {/* Add new notes */}
      <div className="hero container mt-4">
        <h1 className="display-4 text-center">Add Notes</h1>
        <hr />
        <AddNotes addNote={addNote} /> {/* Pass the addNote function */}
      </div>
    </>
  );
}

export default Home;
