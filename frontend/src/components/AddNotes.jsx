import React, { useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../utils/AxiosInstance";

function AddNotes({ addNote }) { // Change updateNotes to addNote
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      dueDate: "",
      priority: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axiosInstance.post("/add-notes", values);
        if (res) {
          setSuccessMessage("Task added successfully!");
          setErrorMessage(null);
          actions.resetForm();
          addNote(res.data.data); // Call addNote with the new note
        }
      } catch (error) {
        if (error.response) {
          console.error("Error details:", error.response.data);
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        setSuccessMessage(null);
      }
    },
  });

  return (
    <div className="add-notes-outer-div border">
      <div className="add-notes-form">
        <form onSubmit={formik.handleSubmit}>
          {/* Title Input */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="titleHelp"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <div id="titleHelp" className="form-text">
              Enter a unique title
            </div>
          </div>

          {/* Description Input */}
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="desc"
              placeholder="Add description"
              rows="3"
              value={formik.values.desc}
              onChange={formik.handleChange}
            ></textarea>
          </div>

          {/* Due Date Input */}
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
            />
          </div>

          {/* Priority Dropdown */}
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              className="form-select"
              value={formik.values.priority}
              onChange={formik.handleChange}
            >
              <option value="" label="Select priority" />
              <option value="low" label="Low" />
              <option value="medium" label="Medium" />
              <option value="high" label="High" />
            </select>
          </div>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
