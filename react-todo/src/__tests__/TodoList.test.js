import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

// Mock the AddTodoForm since we are only testing TodoList's initial render logic
// This is good practice to isolate the component being tested.
jest.mock("../components/AddTodoForm", () => {
  return function MockAddTodoForm({ onAddTodo }) {
    return (
      <div
        data-testid="add-todo-form-mock"
        onClick={() => onAddTodo("Mock Task")}
      ></div>
    );
  };
});

describe("TodoList Component - Interactions", () => {
  //Test 1: Verify the component renders without errors
  test("renders the main component structure without errors", () => {
    //Render the component into a virtual DOM
    render(<TodoList />);
  });

  //Test 2: Verify that all initial state todos are displayed
  test("renders the initial state of the three demo todo items", () => {
    //Render the component
    render(<TodoList />);

    //Define the expected todo texts on TodoList.jsx
    const initialTodos = [
      "Learn React Hooks",
      "Master Tailwind CSS",
      "Implement a Nested Routing",
    ];

    // Use `getAllByText` to find all elements matching the todo texts
    // This asserts that all three specific items are present.
    initialTodos.forEach((TodoText) => {
      expect(screen.getByText(TodoText)).toBeInTheDocument();
    });

    // Use `getAllByRole` to find all list items (li) to verify the count.
    // We are looking for the <li> elements containing the todo text,
    // which are identifiable as list items.
    const listItems = screen.getAllByRole("listitem");

    // Assertion: Verify the total number of items matches the initial state count
    expect(listItems).toHaveLength(3);
  });

  //Create a user instance for userEvent simulations
  let user;

  beforeEach(() => {
    //Initialize user instance before each test
    user = userEvent.setup();
  });

  // ======================================
  // Test 1: Verify Adding a New Todo
  // ======================================
  test("allows a new todo item to be added to the list", async () => {
    render(<TodoList />);

    // 1. Arrange: Identify the button/form element that triggers the add function.
    // We are relying on the mock's data-testid for the button
    const addButton = screen.getByTestId("add-button");

    //Check initial state count (3 items)
    let listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);

    //2. Act: simulate clicking the add button to add the "Test New Task" defined in the mock.
    await user.click(addButton);

    //3. Assert: Verify the new todo text is now in the document
    const newTodoText = screen.getByText("Test New Task");
    expect(newTodoText).toBeInTheDocument();

    //Assert: Verify the total count has increased to 4
    listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(4);

    // ======================================
    // Test 2: Verify Toggling a Todo
    // ======================================
    test("allows a todo item to be toggled between completed and not completed", async () => {
      render(<TodoList />);

      //1. Arrange: Identify the todo item to toggle(e.g., "Master Tailwind CSS")
      const todoItem = screen.getByText("Master Tailwind CSS");

      //2. Act: Simulate clicking the text to toggle stat
      await user.click(todoItem);

      //// 3. Assert (Toggle ON): Verify the item now has the completed class
      expect(todoItem).toHaveClass("completed");

      // 4. Act: Simulate clicking the text again to toggle the state back
      await user.click(todoItem);

      // 5. Assert (Toggle OFF): Verify the item no longer has the completed class
      expect(todoItem).not.toHaveClass("line-through");
      expect(todoItem).not.toHaveClass("bg-green-100");
    });

    // ======================================
    // Test 3: Verify Deleting a Todo
    // ======================================
    test("allows a todo item to be deleted from the list", async () => {
      render(<TodoList />);

      // 1. Arrange: Get initial count and identify the item to be deleted
      let listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);

      const todoToDeleteText = "Implement Nested Routing";
      const todoItem = screen.getByText(todoToDeleteText);

      // Find the delete button associated with this item. We use the aria-label for robust querying.
      const deleteButton = screen.getByLabelText(
        `Delete todo: ${todoToDeleteText}`
      );

      // 2. Act: Simulate clicking the delete button
      await user.click(deleteButton);

      // 3. Assert: Verify the item is no longer in the document
      // We use queryByText because we expect the element NOT to be found (getBy* would throw an error)
      expect(screen.queryByText(todoToDeleteText)).not.toBeInTheDocument();

      // 4. Assert: Verify the total count has decreased to 2
      listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
    });
  });
});
