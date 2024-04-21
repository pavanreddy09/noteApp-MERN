import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function NotesDetails({ title, content, id, fetchNotes }) {
  const [isOverflow, setIsOverflow] = useState(false);
  const heightRef = useRef(null);

  const deleteNote = async (id) => {
    alert("Are you sure?");

    const userInfo = localStorage.getItem("userInfo") || "";
    if (!userInfo) return;

    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(userInfo).token}`,
      },
    };

    await axios
      .delete(`http://localhost:5000/api/notes/${id}`, config)
      .then((res) => {
        alert("Note Deleted!");
        // window.location.href = "/";
        fetchNotes();
      })
      .catch((err) => console.log(err.response.data.message));
  };

  useEffect(() => {
    const el = heightRef.current;
    if (el.offsetHeight < el.scrollHeight) {
      setIsOverflow(true);
    }
  }, []);
  return (
    <div key={id} className="notes-details">
      <div className="notes" ref={heightRef}>
        <div className="notes-title">
          <div>
            <h3>{title}</h3>
          </div>
          <div className="edit-delete-btn">
            <Link to={`/edit/${id}`}>
              <button className="edit-btn">
                <EditIcon sx={{ fontSize: "12px", marginRight: "2px" }} />
                Edit
              </button>
            </Link>
            {/* <Link to={`/edit/${id}`}> */}
            <button className="delete-btn" onClick={() => deleteNote(id)}>
              <DeleteIcon sx={{ fontSize: "12px" }} /> Delete
            </button>
            {/* </Link> */}
          </div>
        </div>

        <div className="note-content">
          <p>{content}</p>
        </div>
      </div>
      <input type="checkbox" className={isOverflow ? "checkbox" : "ch"} />
    </div>
  );
}

export default NotesDetails;
