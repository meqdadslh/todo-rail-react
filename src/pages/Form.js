import React, { useState } from "react";
const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  ////////////////////
  // The Form Data State
  ////////////////////
  const [formData, setFormData] = useState(initialTodo);
  /////////////////////
  // functions
  /////////////////////
  const handleChange = (event) => {
    //Make a copy of the current state
    const newState = { ...formData };
    //updating a property on the object
    newState[event.target.name] = event.target.value;
    //pass the object as the new state
    setFormData(newState);
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.subject}
        name="subject"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.details}
        name="details"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};
export default Form;