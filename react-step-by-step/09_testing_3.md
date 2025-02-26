# **🔹 Unit Testing & Integration Testing in React 🚀**

Testing is crucial in React to ensure that components and functions work **correctly** and **reliably**. There are two main types of tests:

1️⃣ **Unit Testing** – Tests **individual components or functions** in isolation.  
2️⃣ **Integration Testing** – Tests **how multiple components work together**.

---

## **🔹 1. What is Unit Testing?**

✅ **Unit Testing** tests a **single unit of code** (e.g., a function or component) in **isolation**.  
✅ It ensures that each part **works as expected** before being combined with other parts.

**Tools Used:**

- Jest (for functions & components)
- React Testing Library (for component rendering & behavior)

---

### **🔹 Example 1: Unit Testing a Function with Jest**

Let's say we have a simple function:

```jsx
// utils.js
export const add = (a, b) => a + b;
```

✅ **Unit Test for `add()` function**

```jsx
// utils.test.js
import { add } from "./utils";

test("adds 2 + 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});
```

👉 Run tests:

```sh
npm test
```

✅ **If the function works correctly, the test passes!**

---

### **🔹 Example 2: Unit Testing a React Component**

Let's test a simple **Button** component.

```jsx
// Button.js
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

✅ **Unit Test for the Button Component**

```jsx
// Button.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders the button with correct label", () => {
  render(<Button label="Click Me" />);
  const button = screen.getByText(/click me/i);
  expect(button).toBeInTheDocument();
});

test("calls onClick when button is clicked", () => {
  const handleClick = jest.fn();
  render(<Button label="Click Me" onClick={handleClick} />);

  const button = screen.getByText(/click me/i);
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

✅ **Now we have tested that:**

- The button renders correctly.
- Clicking the button triggers the `onClick` function.

---

## **🔹 2. What is Integration Testing?**

✅ **Integration Testing** tests how **multiple units work together**.  
✅ It ensures that different **components/functions interact correctly**.

**Example:**

- Testing if a **form updates state** correctly.
- Checking if **a button triggers an API call**.
- Ensuring **data flows correctly between components**.

---

### **🔹 Example: Integration Test for a Form Component**

Let's test a simple **LoginForm** that updates state and calls a function on submit.

```jsx
// LoginForm.js
import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
```

✅ **Integration Test for `LoginForm`**

```jsx
// LoginForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("updates state and calls onSubmit when submitted", () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const input = screen.getByPlaceholderText("Enter email");
  const button = screen.getByText("Submit");

  // Simulate user typing
  fireEvent.change(input, { target: { value: "test@example.com" } });
  expect(input.value).toBe("test@example.com");

  // Simulate form submission
  fireEvent.click(button);

  // Check if onSubmit was called with the correct value
  expect(handleSubmit).toHaveBeenCalledWith("test@example.com");
});
```

✅ **What this test checks:**

- The input **updates state when typing**.
- The form **calls `onSubmit` with the entered email**.

---

## **🔹 3. Unit Testing vs. Integration Testing**

| Feature           | **Unit Testing** ✅              | **Integration Testing** ✅✅     |
| ----------------- | -------------------------------- | -------------------------------- |
| **What it Tests** | Individual function or component | Multiple components interacting  |
| **Scope**         | Small (isolated tests)           | Larger (tests user interactions) |
| **Tools**         | Jest, React Testing Library      | Jest, React Testing Library      |
| **Use Case**      | Testing a button click           | Testing a form submission        |

✅ **Unit Tests ensure each piece works correctly.**  
✅ **Integration Tests ensure pieces work together correctly.**

---

## **🔹 4. Best Practices for Testing in React**

✅ **Write small, focused unit tests for functions & components.**  
✅ **Use integration tests for user interactions (e.g., form submission, API calls).**  
✅ **Mock API calls to avoid real network requests.**  
✅ **Use React Testing Library to test behavior, not implementation details.**  
✅ **Run tests frequently to catch bugs early.**

