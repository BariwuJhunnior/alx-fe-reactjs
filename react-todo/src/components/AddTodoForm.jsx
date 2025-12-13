import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to add todo item
    const trimmedText = inputText.trim();
    if (trimmedText === "") return; //Prevent empy submissions

    //Call the parent's function to update the state
    onAddTodo(trimmedText);

    //Clear the input field after submission
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder="What needs to be done?"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
