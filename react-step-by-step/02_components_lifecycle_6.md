# ✅ **Controlled vs. Uncontrolled Components in React**

## 🔹 **1️⃣ What are Controlled & Uncontrolled Components?**

In React, form elements like `<input>`, `<textarea>`, and `<select>` can be handled in **two ways**:

| Type                       | Definition                                                 |
| -------------------------- | ---------------------------------------------------------- |
| **Controlled Component**   | React fully controls the form element using `useState`.    |
| **Uncontrolled Component** | The form element keeps its own state (like in plain HTML). |

---

## 🔹 **2️⃣ Controlled Components** (React **controls** the input value)

- The **input value is stored in state** using `useState`.
- Every change is handled by a React function (`onChange`).
- React **determines the displayed value** of the input.

### ✅ **Example: Controlled Input**

```jsx
import React, { useState } from "react";

const ControlledInput = () => {
  const [text, setText] = useState(""); // State stores input value

  return (
    <div>
      <input
        type="text"
        value={text} // Controlled by React state
        onChange={(e) => setText(e.target.value)} // Updates state
      />
      <p>Typed: {text}</p>
    </div>
  );
};

export default ControlledInput;
```

✔️ **Pros of Controlled Components**  
✅ Easy to manage and validate input values.  
✅ Allows real-time updates and form submission handling.  
✅ Works well with controlled UI elements.

---

## 🔹 **3️⃣ Uncontrolled Components** (HTML **controls** the input value)

- The **input value is stored in the DOM**, not in state.
- Uses `useRef` to access the input's current value.
- React **does not control** the input's value.

### ✅ **Example: Uncontrolled Input**

```jsx
import React, { useRef } from "react";

const UncontrolledInput = () => {
  const inputRef = useRef(null); // Reference to input element

  const handleSubmit = () => {
    alert(`Entered: ${inputRef.current.value}`); // Access input value directly
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UncontrolledInput;
```

✔️ **Pros of Uncontrolled Components**  
✅ Simpler for basic forms.  
✅ Works better when integrating with non-React code (e.g., legacy systems).  
✅ No need to manage state for every keystroke.

---

## 🔹 **4️⃣ Controlled vs. Uncontrolled: Key Differences**

| Feature                 | Controlled Component                | Uncontrolled Component               |
| ----------------------- | ----------------------------------- | ------------------------------------ |
| **State Handling**      | Uses `useState`                     | Uses `useRef`                        |
| **Input Value Storage** | React state                         | DOM (default behavior)               |
| **Event Handling**      | `onChange` updates state            | Value accessed via `ref`             |
| **Form Validation**     | Easy, as value is in state          | Harder, must access DOM manually     |
| **Use Case**            | When React needs control over input | When integrating with non-React code |

---

## 🔹 **5️⃣ When to Use What?**

✔️ **Use Controlled Components when:**

- You need **real-time validation** (e.g., checking password strength).
- The input value affects other parts of the UI.
- You want to store input values in a global state (like Redux).

✔️ **Use Uncontrolled Components when:**

- You need to **integrate with third-party libraries** (like a file upload input).
- You don’t need to track every keystroke.
- You are working with **simple forms** (e.g., contact forms).
