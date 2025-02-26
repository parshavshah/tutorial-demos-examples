# **🔹 Snapshot Testing in React 🚀**

## **1️⃣ What is Snapshot Testing?**

✅ **Snapshot testing** is a method to ensure that the **UI of a component doesn't change unexpectedly**.  
✅ It **captures a "snapshot" of a component’s rendered output** and compares it to previous snapshots.  
✅ If the component **changes**, the test **fails**, alerting developers to review the changes.

📌 **Tool Used:** Jest

---

## **2️⃣ Why Use Snapshot Testing?**

✅ Detects **unexpected UI changes** after code updates.  
✅ Useful for **component-based applications** like React.  
✅ Helps maintain **UI consistency**.

🚀 **Best for:**

- Stateless & functional components
- Components with fixed output (e.g., buttons, headers)

❌ **Not ideal for:**

- Dynamic components (e.g., those that rely on props/state changes)

---

## **3️⃣ How to Perform Snapshot Testing in React**

### **Step 1: Install Jest (if not already installed)**

```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

📌 If using **Create React App**, Jest is already included.

---

### **Step 2: Create a Simple Component**

Let's say we have a **Button** component:

```jsx
// Button.js
const Button = ({ label }) => {
  return <button>{label}</button>;
};

export default Button;
```

---

### **Step 3: Write a Snapshot Test**

```jsx
// Button.test.js
import { render } from "@testing-library/react";
import Button from "./Button";

test("matches snapshot", () => {
  const { asFragment } = render(<Button label="Click Me" />);
  expect(asFragment()).toMatchSnapshot();
});
```

---

### **Step 4: Run the Test**

```sh
npm test
```

✅ **First Run:** Jest will create a `__snapshots__` folder and store the snapshot.

---

## **4️⃣ What Happens When the Component Changes?**

If someone **accidentally** modifies the button (e.g., changes `<button>` to `<span>`), the test **fails**:

❌ **Snapshot Test Failure Example:**

```
Snapshot Test Failed!
Received: <span>Click Me</span>
Expected: <button>Click Me</button>
```

✅ **Solution?** If the change was **intended**, update the snapshot:

```sh
npm test -- -u
```

This updates the stored snapshot with the new component output.

---

## **5️⃣ When to Use Snapshot Testing?**

✅ Good for **static components** (headers, footers, buttons).  
✅ Works well with **pure functional components**.  
❌ **Not ideal for:**

- Components that frequently change (dynamic content).
- Components with API data (use mock tests instead).

---

## **6️⃣ Summary & Best Practices**

✅ **Use Snapshot Testing for UI consistency.**  
✅ **Update snapshots only when intentional UI changes occur.**  
✅ **Combine snapshot testing with unit/integration tests for better coverage.**
