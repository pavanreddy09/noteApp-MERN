import React, { useEffect, useState } from "react";
import Userform from "./userform";
import axios from "axios";

function RegisterPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    await axios
      .post("http://localhost:5000/api/user/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setIsLoading(false);
        window.location.href = "/";
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 8000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  return (
    <div>
      <h1>Register</h1>
      <Userform
        submitFormData={submitFormData}
        formValues={formValues}
        setFormValues={setFormValues}
        buttonName={"register"}
        linkto={"/login"}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default RegisterPage;
