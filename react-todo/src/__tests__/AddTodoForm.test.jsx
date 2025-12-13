import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddTodoForm from "../components/AddTodoForm";

describe("AddTodoForm Component", () => {
  test("renders the form with input field and button", () => {
    const mockOnAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i })
    ).toBeInTheDocument();
  });

  test("calls onAddTodo when form is submitted with valid input", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Type in the input field
    await user.type(inputField, "Learn testing");

    // Submit the form
    await user.click(submitButton);

    // Verify that onAddTodo was called with the correct argument
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith("Learn testing");
  });

  test("calls onAddTodo when Enter key is pressed", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");

    // Type and press Enter
    await user.type(inputField, "Learn testing{enter}");

    // Verify that onAddTodo was called
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith("Learn testing");
  });

  test("does not call onAddTodo when submitting empty form", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Submit empty form
    await user.click(submitButton);

    // Verify that onAddTodo was NOT called
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("does not call onAddTodo when submitting form with only whitespace", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Type whitespace and submit
    await user.type(inputField, "   ");
    await user.click(submitButton);

    // Verify that onAddTodo was NOT called
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test("clears input field after successful submission", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Type and submit
    await user.type(inputField, "Learn testing");
    await user.click(submitButton);

    // Verify that input field is cleared
    expect(inputField).toHaveValue("");
  });

  test("handles input change correctly", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");

    // Type in the input field
    await user.type(inputField, "Test input");

    // Verify that the input field has the correct value
    expect(inputField).toHaveValue("Test input");
  });

  test("handles form submission with special characters", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Type with special characters and submit
    await user.type(inputField, "Learn @React & Testing!");
    await user.click(submitButton);

    // Verify that onAddTodo was called with the correct argument
    expect(mockOnAddTodo).toHaveBeenCalledWith("Learn @React & Testing!");
  });

  test("handles form submission with very long text", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    const longText =
      "This is a very long todo item that might be used to test how the component handles longer strings and whether there are any issues with character limits or display problems when dealing with extended content";

    // Type long text and submit
    await user.type(inputField, longText);
    await user.click(submitButton);

    // Verify that onAddTodo was called with the full text
    expect(mockOnAddTodo).toHaveBeenCalledWith(longText);
  });

  test("prevents default form submission behavior", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");

    // Mock preventDefault to verify it was called
    const preventDefault = jest.fn();

    // Type and submit, simulating a form event
    await user.type(inputField, "Test todo");
    const form = screen.getByRole("form");
    fireEvent.submit(form, { preventDefault });

    // Verify that preventDefault was called
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  test("handles multiple rapid submissions", async () => {
    const mockOnAddTodo = jest.fn();
    const user = userEvent.setup();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputField = screen.getByPlaceholderText("What needs to be done?");
    const submitButton = screen.getByRole("button", { name: /add todo/i });

    // Submit multiple times rapidly
    await user.type(inputField, "First todo");
    await user.click(submitButton);

    await user.type(inputField, "Second todo");
    await user.click(submitButton);

    await user.type(inputField, "Third todo");
    await user.click(submitButton);

    // Verify that onAddTodo was called three times
    expect(mockOnAddTodo).toHaveBeenCalledTimes(3);
    expect(mockOnAddTodo).toHaveBeenNthCalledWith(1, "First todo");
    expect(mockOnAddTodo).toHaveBeenNthCalledWith(2, "Second todo");
    expect(mockOnAddTodo).toHaveBeenNthCalledWith(3, "Third todo");
  });
});
