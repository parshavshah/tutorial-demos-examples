# **🔹 Introduction to Testing in React (Jest & React Testing Library) 🚀**

Testing is essential to ensure that a React application **works correctly**, remains **bug-free**, and doesn't break after updates.

✅ **Popular Testing Tools in React:**  
1️⃣ **Jest** – A JavaScript testing framework.  
2️⃣ **React Testing Library (RTL)** – For testing React components.

---

## **🔹 1. Why Test in React?**

✅ **Ensures application reliability** – Catches bugs before deployment.  
✅ **Prevents regressions** – Detects broken features after updates.  
✅ **Improves maintainability** – Helps refactor code safely.  
✅ **Automates testing** – Reduces manual testing effort.

---

## **🔹 2. Types of Tests in React**

1️⃣ **Unit Tests** – Test **individual functions/components** in isolation.  
2️⃣ **Integration Tests** – Test **how multiple components interact**.  
3️⃣ **End-to-End (E2E) Tests** – Test **the full application flow** (e.g., using Cypress).

🔹 **Jest** is used for unit and integration testing.  
🔹 **React Testing Library** focuses on component behavior, not implementation details.

---

## **🔹 3. Setting Up Jest & React Testing Library**

✅ **Jest is included with Create React App**, so no need to install it separately.  
👉 **For manual setup:**

```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## **🔹 4. Writing Your First Test with Jest**

### **✅ Example: Testing a Function with Jest**

```jsx
// utils.js (A simple function)
export const add = (a, b) => a + b;
```

```jsx
// utils.test.js (Unit test for add function)
import { add } from "./utils";

test("adds 2 + 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});
```

👉 Run tests:

```sh
npm test
```

✅ **Jest automatically finds files ending with `.test.js` or `.spec.js`.**

---

## **🔹 5. Testing React Components with React Testing Library**

✅ **React Testing Library focuses on how users interact with components.**

### **🔹 Example: Testing a Button Component**

```jsx
// Button.js (Component)
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

```jsx
// Button.test.js (Component Test)
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

✅ **Tests ensure:**

- The button **renders correctly**.
- The **onClick function gets called** when clicked.

---

## **🔹 6. Common React Testing Library Queries**

| Function                            | Purpose                                              |
| ----------------------------------- | ---------------------------------------------------- |
| `screen.getByText(text)`            | Finds an element by text                             |
| `screen.getByRole(role)`            | Finds an element by role (`button`, `heading`, etc.) |
| `screen.getByPlaceholderText(text)` | Finds input fields by placeholder                    |
| `fireEvent.click(element)`          | Simulates user click                                 |

👉 Example:

```jsx
const input = screen.getByPlaceholderText("Enter name");
fireEvent.change(input, { target: { value: "John" } });
```

---

## **🔹 7. Snapshot Testing with Jest**

Snapshot testing ensures **UI consistency** after updates.

👉 **Create a snapshot test:**

```jsx
import { render } from "@testing-library/react";
import Button from "./Button";

test("matches snapshot", () => {
  const { asFragment } = render(<Button label="Click Me" />);
  expect(asFragment()).toMatchSnapshot();
});
```

✅ If the UI changes unexpectedly, Jest warns you to update the snapshot.

---

## **🔹 8. Mocking API Calls with Jest**

When testing components that **fetch data**, we **mock API calls** to avoid real network requests.

👉 **Example: Testing an API Call**

```jsx
// fetchData.js (API function)
export const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  return response.json();
};
```

```jsx
// fetchData.test.js (Mocking API call)
import { fetchData } from "./fetchData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Hello World" }),
  })
);

test("fetches data from API", async () => {
  const data = await fetchData();
  expect(data.message).toBe("Hello World");
});
```

✅ **Now tests run without making real API requests!**

---

## **🔹 9. Running & Watching Tests**

👉 **Run all tests:**

```sh
npm test
```

👉 **Run tests in watch mode:**

```sh
npm test -- --watch
```

👉 **Run tests for a specific file:**

```sh
npm test Button.test.js
```

---

## **🔹 10. Summary & Best Practices**

✅ **Use Jest for unit and integration tests.**  
✅ **Use React Testing Library to test component behavior, not implementation details.**  
✅ **Mock API calls to avoid real network requests.**  
✅ **Use snapshot testing for UI consistency.**  
✅ **Run tests frequently to prevent regressions.**

