import React from "react";

export default function Noteform({
  submitFormData,
  formValues,
  setFormValues,
  isLoading,
}) {
  return (
    <div className="form-div">
      <div className="from-container">
        <form onSubmit={submitFormData}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
            required
          />
          <label htmlFor="content">Content:</label>
          <textarea
            type="text"
            id="content"
            name="content"
            rows={6}
            placeholder="Enter content"
            value={formValues.content}
            onChange={(e) =>
              setFormValues({ ...formValues, content: e.target.value })
            }
            required
          ></textarea>
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
