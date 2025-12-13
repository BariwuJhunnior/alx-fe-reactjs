import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";

// Helper for generating unique IDs (important for keys and manipulating specific todos)
let nextId = 4;

const TodoList = () => {
  // 1. Component State Initialization
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React Hooks", completed: true },
    { id: 2, text: "Master Tailwind CSS", completed: false },
    { id: 3, text: "Implement a Nested Routing", completed: false },
  ]);

  // ======================================
  // 2. State Management Methods
  // ======================================
  /**
   * Adds a new todo item to the list.
   * @param {string} newText - The text for the new todo.
   */
  const addTodo = (newText) => {
    if (!newText.trim()) return; //Prevent empty rodos

    const newTodo = {
      id: nextId++,
      text: newText.trim(),
      completed: false,
    };

    //Use the functional update form of setTodos for safety
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  /**
   * Toggles the completion status of a todo item.
   * @param {number} id - The ID of the todo to toggle.
   */
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Deletes a todo item from the list.
   * @param {number} id - The ID of the todo to delete.
   */
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>React Todo List</h1>

      {/* AddTodoForm component - receives the addTodo function as a prop */}
      <AddTodoForm onAddTodo={addTodo} />

      <h2>Your Todos</h2>

      {/* Display the list of todos */}
      <ul>
        {todos.map((todo) => (
          //Individual Todo Item Rendering
          <li
            key={todo.id}
            className={`
              flex justify-between items-center p-3 rounded-lg shadow-sm
              ${
                todo.completed
                  ? "bg-green-100 text-gray-500 line-through"
                  : "bg-gray-50 text-gray-900 hover:bg-gray-100"
              }
              transition duration-200 ease-in-out cursor-pointer
            `}
          >
            {/* Clickable text to toggle completion status */}
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>

            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-4 text-red-500 hover:text-red-700 font-bold p-1 rounded-full hover:bg-white"
              aria-label={`Delete todo: ${todo.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Display message if list is empty */}
      {todos.length === 0 && (
        <p className="text-gray-500 text-center mt-6 p-4 border-dashed border-2 rounded">
          You are all caught up! Time to relax.
        </p>
      )}
    </div>
  );
};

export default TodoList;
