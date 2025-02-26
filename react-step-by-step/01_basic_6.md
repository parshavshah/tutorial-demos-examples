## ✅ **Handling Events in React**

In React, handling events is similar to handling events in plain JavaScript, but with some key differences:

- **Events are written in camelCase** (e.g., `onClick` instead of `onclick`).
- **Use functions (event handlers) to handle events**.
- **Use `onEvent={functionName}` instead of inline event attributes**.

---

## **🔹 Example: Handling Click Event**

### ✅ Functional Component Example

```jsx
import React from "react";

const ClickButton = () => {
  const handleClick = () => {
    alert("Button Clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
};

export default ClickButton;
```

🔹 Here, `handleClick` is called when the button is clicked.

---

## **🔹 Example: Handling Events with State**

### ✅ Updating State on Button Click

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
```

🔹 Here, `setCount(count + 1)` updates the state when the button is clicked.

---

## **🔹 Event Handling with Parameters**

### ✅ Passing Arguments to Event Handlers

```jsx
const Greeting = (name) => {
  alert(`Hello, ${name}!`);
};

<button onClick={() => Greeting("John")}>Say Hello</button>;
```

🔹 Using an **arrow function** inside `onClick` ensures that the function is only called when clicked.

---

## **🔹 Handling Form Events (onChange)**

### ✅ Updating State on Input Change

```jsx
import React, { useState } from "react";

const InputField = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <p>You typed: {text}</p>
    </div>
  );
};

export default InputField;
```

🔹 Here, `onChange` updates `text` state whenever the input changes.

---

## **📌 Summary: Key Event Handlers in React**

| Event         | Description                | Example                                        |
| ------------- | -------------------------- | ---------------------------------------------- |
| `onClick`     | Handles button clicks      | `<button onClick={handleClick}>Click</button>` |
| `onChange`    | Tracks input field changes | `<input onChange={handleChange} />`            |
| `onSubmit`    | Handles form submission    | `<form onSubmit={handleSubmit}>`               |
| `onMouseOver` | Detects mouse hover        | `<div onMouseOver={handleHover}>`              |

Would you like a real-world example, like a form submission? 🚀
