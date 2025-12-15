import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTodoForm from "../components/AddTodoForm";

describe("AddTodoForm Component", () => {
  test("renders form with input and submit button", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByRole("button", { name: /Add Todo/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("calls onAddTodo with input text when form is submitted", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    await userEvent.type(input, "New todo");
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("New todo");
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
  });

  test("clears input field after submission", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    await userEvent.type(input, "Test");
    fireEvent.click(submitButton);

    expect(input).toHaveValue("");
  });

  test("does not call onAddTodo for empty input", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const submitButton = screen.getByRole("button", { name: /Add Todo/i });
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("trims whitespace from input before calling onAddTodo", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    await userEvent.type(input, "  Test todo  ");
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).toHaveBeenCalledWith("Test todo");
  });

  test("does not call onAddTodo for whitespace-only input", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /Add Todo/i });

    await userEvent.type(input, "   ");
    fireEvent.click(submitButton);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("updates input value as user types", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");

    await userEvent.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  test("submits form on Enter key press", async () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("What needs to be done?");

    await userEvent.type(input, "Test{Enter}");

    expect(mockOnAddTodo).toHaveBeenCalledWith("Test");
  });
});
