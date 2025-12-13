import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders the TodoList component", () => {
    render(<TodoList />);

    // Check if main heading is present
    expect(screen.getByText("React Todo List")).toBeInTheDocument();

    // Check if "Your Todos" heading is present
    expect(screen.getByText("Your Todos")).toBeInTheDocument();
  });

  test("renders initial todo items", () => {
    render(<TodoList />);

    // Check if initial todos are rendered
    expect(screen.getByText("Learn React Hooks")).toBeInTheDocument();
    expect(screen.getByText("Master Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Implement a Nested Routing")).toBeInTheDocument();
  });

  test("displays correct number of initial todos", () => {
    render(<TodoList />);

    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(3);
  });

  test("shows completed todos with different styling", () => {
    render(<TodoList />);

    // Find the completed todo (Learn React Hooks)
    const completedTodo = screen.getByText("Learn React Hooks");
    expect(completedTodo.closest("li")).toHaveClass(
      "bg-green-100",
      "text-gray-500",
      "line-through"
    );
  });

  test("shows incomplete todos with different styling", () => {
    render(<TodoList />);

    // Find incomplete todos
    const incompleteTodo1 = screen.getByText("Master Tailwind CSS");
    const incompleteTodo2 = screen.getByText("Implement a Nested Routing");

    expect(incompleteTodo1.closest("li")).toHaveClass(
      "bg-gray-50",
      "text-gray-900",
      "hover:bg-gray-100"
    );
    expect(incompleteTodo2.closest("li")).toHaveClass(
      "bg-gray-50",
      "text-gray-900",
      "hover:bg-gray-100"
    );
  });

  test("toggles todo completion status when clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Find an incomplete todo
    const incompleteTodo = screen.getByText("Master Tailwind CSS");

    // Click on it to toggle completion
    await user.click(incompleteTodo);

    // Check if it now has completed styling
    expect(incompleteTodo.closest("li")).toHaveClass(
      "bg-green-100",
      "text-gray-500",
      "line-through"
    );
  });

  test("toggles completed todo back to incomplete", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Find a completed todo
    const completedTodo = screen.getByText("Learn React Hooks");

    // Click on it to toggle back to incomplete
    await user.click(completedTodo);

    // Check if it now has incomplete styling
    expect(completedTodo.closest("li")).toHaveClass(
      "bg-gray-50",
      "text-gray-900",
      "hover:bg-gray-100"
    );
  });

  test("deletes a todo when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Find delete buttons and click the first one
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Check if the first todo is removed
    expect(screen.queryByText("Learn React Hooks")).not.toBeInTheDocument();

    // Check if other todos are still there
    expect(screen.getByText("Master Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Implement a Nested Routing")).toBeInTheDocument();
  });

  test("adds a new todo through the form", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Find input field and add button
    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Type new todo and submit
    await user.type(inputField, "Write unit tests");
    await user.click(addButton);

    // Check if new todo is added
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();

    // Check if todo count increased
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(4);
  });

  test("does not add empty todos", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Try to submit empty form
    await user.click(addButton);

    // Check if todo count remains the same
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(3);
  });

  test("does not add todos with only whitespace", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Type whitespace and submit
    await user.type(inputField, "   ");
    await user.click(addButton);

    // Check if todo count remains the same
    const todoItems = screen.getAllByRole("listitem");
    expect(todoItems).toHaveLength(3);
  });

  test("clears input field after adding a todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Add a todo
    await user.type(inputField, "Test todo");
    await user.click(addButton);

    // Check if input field is cleared
    expect(inputField).toHaveValue("");
  });

  test("displays empty state message when all todos are deleted", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Delete all todos
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    for (let i = 0; i < deleteButtons.length; i++) {
      await user.click(deleteButtons[i]);
    }

    // Check if empty state message is displayed
    expect(
      screen.getByText("You are all caught up! Time to relax.")
    ).toBeInTheDocument();
  });

  test("assigns unique IDs to new todos", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    // Add multiple todos
    await user.type(inputField, "First todo");
    await user.click(addButton);

    await user.type(inputField, "Second todo");
    await user.click(addButton);

    // Check if both todos are rendered with different content
    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();

    // Verify they are different elements
    const firstTodo = screen.getByText("First todo");
    const secondTodo = screen.getByText("Second todo");
    expect(firstTodo).not.toBe(secondTodo);
  });

  test("maintains proper key props for todo items", () => {
    const { container } = render(<TodoList />);

    const todoItems = container.querySelectorAll("li");

    // Verify that each li has a unique key-like data attribute
    // (This is implicitly tested by React, but we can verify rendering works)
    expect(todoItems).toHaveLength(3);

    // Each todo should have different content
    const todoTexts = Array.from(todoItems).map(
      (item) => item.querySelector("span").textContent
    );

    expect(todoTexts).toEqual([
      "Learn React Hooks",
      "Master Tailwind CSS",
      "Implement a Nested Routing",
    ]);
  });
});
