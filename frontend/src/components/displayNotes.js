import { useEffect, useState } from "react";
import NotesDetails from "./notesdetails";
import axios from "axios";
import { Link } from "react-router-dom";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

function DisplayNotes() {
  const [notesData, setNotesData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterNotes, setFilterNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    let userInfo = localStorage.getItem("userInfo") || "";
    if (userInfo) {
      try {
        setIsLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(userInfo).token}`,
          },
        };
        // console.log(JSON.parse(userInfo).email);
        const notes = await axios.get(
          "http://localhost:5000/api/notes",
          config
        );
        console.log(notes);
        setNotesData(notes.data);
        setFilterNotes(notes.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        alert(err.response.data.message);
        localStorage.removeItem("userInfo");
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchInputValue(e.target.value);
    const searchList = notesData.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterNotes(searchList);
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="note-container">
      <div className="note-head">
        <div>
          <input
            type="text"
            id="noteInput"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
        <div className="btn-div">
          <Link to="/create">
            <button>CREATE</button>
          </Link>
        </div>
      </div>
      <div className="notes-list">
        {filterNotes.length === 0 && !isLoading ? (
          <div className="no-note">
            <StickyNote2Icon sx={{ fontSize: "150px" }} />
            <p>No Note Found</p>
          </div>
        ) : isLoading ? (
          <div>loading...</div>
        ) : (
          filterNotes.map((note) => {
            return (
              <NotesDetails
                title={note.title}
                content={note.content}
                id={note._id}
                fetchNotes={fetchNotes}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default DisplayNotes;
