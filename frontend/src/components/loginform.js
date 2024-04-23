import React, { useEffect, useState } from "react";
import Userform from "./userform";
import axios from "axios";

const LoginForm = () => {
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
      .post("https://note-app-mern-tau.vercel.app/api/user/login", {
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
    }, 9000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  return (
    <div>
      <h1>Login</h1>

      <Userform
        submitFormData={submitFormData}
        formValues={formValues}
        setFormValues={setFormValues}
        buttonName={"login"}
        linkto={"/register"}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginForm;
