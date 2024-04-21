import React, { useEffect, useState } from "react";
import Noteform from "./noteform";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Editnote() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  const fetchNote = async () => {
    const userInfo = localStorage.getItem("userInfo") || "";
    if (userInfo) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(userInfo).token}`,
          },
        };
        const nt = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          config
        );

        setNote(nt.data);
      } catch (err) {
        alert(err.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    const userInfo = localStorage.getItem("userInfo") || "";
    if (userInfo) {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(userInfo).token}`,
        },
      };
      await axios
        .put(`http://localhost:5000/api/notes/${id}`, note, config)
        .then((res) => {
          alert("Note has been updated!");
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div>
      <h1>Update a Note</h1>
      <Noteform
        submitFormData={submitFormData}
        formValues={note}
        setFormValues={setNote}
        isLoading={false}
      />
    </div>
  );
}
