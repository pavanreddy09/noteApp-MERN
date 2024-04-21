import React, { useEffect, useState } from "react";
import Noteform from "./noteform";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Createnote() {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
  });
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");
    if (!title || !content) {
      return;
    }
    // if (userData !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    await axios
      .post(
        "http://localhost:5000/api/notes/create",
        {
          title: title,
          content: content,
          email: userData.email,
        },
        config
      )
      .then(() => {
        alert("Created!");
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    // } else {
    //   navigate("/login");
    // }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserData(JSON.parse(userInfo));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Creat a Note</h1>
      <Noteform
        submitFormData={submitFormData}
        formValues={formValues}
        setFormValues={setFormValues}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Createnote;
