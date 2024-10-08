import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../utils/AxiosInstance";

function UpdateNotes({ show, handleClose, note, updateNotes }) {
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      title: note.title,
      desc: note.desc,
      dueDate: note.dueDate,
      priority: note.priority,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.put(`/notes/${note._id}`, values);
        updateNotes(res.data.data);
        setSuccessMessage("Note updated successfully!");
        handleClose();
        const modalElement = document.getElementById("updateModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide(); 
      } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error);
      }
    },
  });

  useEffect(() => {
    if (show) {
      const modalElement = document.getElementById("updateModal");
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    } else {
      const modalElement = document.getElementById("updateModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }, [show]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden={!show}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="desc"
                    rows="3"
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                  ></textarea>
                </div>
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
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateNotes;
