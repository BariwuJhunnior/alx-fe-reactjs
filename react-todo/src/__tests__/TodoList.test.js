import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  // ======================================
  // Test 1: Initial Render
  // ======================================
  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);

    // Check if the main heading is rendered
    const heading = screen.getByRole("heading", { name: /React Todo List/i });
    expect(heading).toBeInTheDocument();

    // Check if the todos are rendered
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
    expect(screen.getByText("Master Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Implement a Nested Routing")).toBeInTheDocument();
  });

  test("renders initial todos with correct completion status", () => {
    render(<TodoList />);

    const completedTodo = screen.getByText("Learn React Hooks");
    const incompleteTodos = [
      screen.getByText("Master Tailwind CSS"),
      screen.getByText("Implement a Nested Routing"),
    ];

    // The completed todo should have line-through styling class
    expect(completedTodo.closest("li")).toHaveClass("line-through");

    // Incomplete todos should NOT have line-through styling
    incompleteTodos.forEach((todo) => {
      expect(todo.closest("li")).not.toHaveClass("line-through");
    });
  });

  test("displays correct count of initial todos", () => {
    render(<TodoList />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  // ======================================
  // Test 2: Adding Todos
  // ======================================
  test("adds a new todo when form is submitted", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Initially should have 3 todos
    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    // Type new todo text
    await userEvent.type(input, "Buy groceries");

    // Submit the form
    fireEvent.click(submitButton);

    // Now should have 4 todos
    listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(4);

    // Check if new todo is rendered
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
  });

  test("clears input field after adding a todo", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Type and submit
    await userEvent.type(input, "Test todo");
    fireEvent.click(submitButton);

    // Input should be cleared
    expect(input).toHaveValue("");
  });

  test("prevents adding empty todos", async () => {
    render(<TodoList />);

    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Initially should have 3 todos
    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    // Click submit without entering text
    fireEvent.click(submitButton);

    // Should still have 3 todos (empty todo not added)
    listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test("prevents adding todo with only whitespace", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Initially should have 3 todos
    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    // Type whitespace only
    await userEvent.type(input, "   ");
    fireEvent.click(submitButton);

    // Should still have 3 todos
    listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  // ======================================
  // Test 3: Toggling Todos
  // ======================================
  test("toggles todo completion status when clicked", async () => {
    render(<TodoList />);

    const incompleteTodo = screen.getByText("Master Tailwind CSS");
    const todoItem = incompleteTodo.closest("li");

    // Initially should not have line-through
    expect(todoItem).not.toHaveClass("line-through");

    // Click to toggle
    fireEvent.click(incompleteTodo);

    // Should now have line-through
    expect(todoItem).toHaveClass("line-through");

    // Click again to toggle back
    fireEvent.click(incompleteTodo);

    // Should no longer have line-through
    expect(todoItem).not.toHaveClass("line-through");
  });

  test("toggles a completed todo back to incomplete", async () => {
    render(<TodoList />);

    const completedTodo = screen.getByText("Learn React Hooks");
    const todoItem = completedTodo.closest("li");

    // Initially should have line-through
    expect(todoItem).toHaveClass("line-through");

    // Click to toggle
    fireEvent.click(completedTodo);

    // Should no longer have line-through
    expect(todoItem).not.toHaveClass("line-through");
  });

  test("toggles multiple todos independently", async () => {
    render(<TodoList />);

    const todo1 = screen.getByText("Learn React Hooks");
    const todo2 = screen.getByText("Master Tailwind CSS");

    const todo1Item = todo1.closest("li");
    const todo2Item = todo2.closest("li");

    // Toggle first todo
    fireEvent.click(todo1);
    expect(todo1Item).not.toHaveClass("line-through");
    expect(todo2Item).not.toHaveClass("line-through");

    // Toggle second todo
    fireEvent.click(todo2);
    expect(todo1Item).not.toHaveClass("line-through");
    expect(todo2Item).toHaveClass("line-through");
  });

  // ======================================
  // Test 4: Deleting Todos
  // ======================================
  test("deletes a todo when delete button is clicked", () => {
    render(<TodoList />);

    // Initially should have 3 todos
    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    // Get delete button for the first todo
    const deleteButtons = screen.getAllByRole("button", {
      name: /Delete todo/i,
    });
    fireEvent.click(deleteButtons[0]);

    // Should now have 2 todos
    listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    // The deleted todo should not be in the document
    expect(screen.queryByText("Learn React Hooks")).not.toBeInTheDocument();
  });

  test("deletes multiple todos individually", () => {
    render(<TodoList />);

    // Initially should have 3 todos
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    // Delete first todo
    let deleteButtons = screen.getAllByRole("button", { name: /Delete todo/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    // Delete another todo
    deleteButtons = screen.getAllByRole("button", { name: /Delete todo/i });
    fireEvent.click(deleteButtons[0]);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  test("displays empty state message when all todos are deleted", () => {
    render(<TodoList />);

    // Delete all todos
    const deleteButtons = screen.getAllByRole("button", {
      name: /Delete todo/i,
    });
    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    // Should display the empty state message
    expect(
      screen.getByText(/You are all caught up! Time to relax./i)
    ).toBeInTheDocument();
  });

  // ======================================
  // Test 5: Integration Tests
  // ======================================
  test("performs add, toggle, and delete operations in sequence", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Add a new todo
    await userEvent.type(input, "Integration test todo");
    fireEvent.click(submitButton);

    expect(screen.getByText("Integration test todo")).toBeInTheDocument();

    // Toggle the new todo
    const newTodo = screen.getByText("Integration test todo");
    fireEvent.click(newTodo);
    expect(newTodo.closest("li")).toHaveClass("line-through");

    // Delete the todo
    const deleteButtons = screen.getAllByRole("button", {
      name: /Delete todo/i,
    });
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(screen.queryByText("Integration test todo")).not.toBeInTheDocument();
  });

  test("handles multiple add operations", async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    // Initially 3 todos
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    // Add 3 new todos
    for (let i = 1; i <= 3; i++) {
      await userEvent.type(input, `Todo ${i}`);
      fireEvent.click(submitButton);
    }

    // Should now have 6 todos
    expect(screen.getAllByRole("listitem")).toHaveLength(6);

    // All new todos should be in the document
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();
  });
});
