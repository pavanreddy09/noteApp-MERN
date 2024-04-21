import React from "react";
import { Link } from "react-router-dom";

const Userform = ({
  submitFormData,
  formValues,
  setFormValues,
  buttonName,
  linkto,
  errorMessage,
  isLoading,
}) => {
  return (
    <div className="form-div">
      <div className="from-container">
        {errorMessage && <div className="error-msg">{errorMessage}</div>}
        <form onSubmit={submitFormData}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            required
          />
          <div className="button-group">
            <button type="submit" className="btn-login" disabled={isLoading}>
              {buttonName.toUpperCase() || ""}
            </button>
            <p>
              {buttonName === "register"
                ? "Do Have an account?"
                : "Don't Have an account?"}
              <Link to={linkto}>{linkto.split("/")[1]}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userform;
