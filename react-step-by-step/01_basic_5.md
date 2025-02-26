## ✅ **Props & State in React**

In React, **props (properties)** and **state** are two important concepts used to manage and pass data within components.

---

## **🔹 1️⃣ Props (Properties)**

Props are **read-only** and used to pass **data from a parent component to a child component**. They help in making components reusable.

### 🔹 **Example of Props:**

```jsx
const Greeting = (props) => {
  return <h2>Hello, {props.name}!</h2>;
};

// Using the Greeting component
const App = () => {
  return <Greeting name="John" />;
};
```

### ✅ **Key Points About Props:**

✔ **Passed from parent to child**  
✔ **Immutable (Cannot be changed by the child component)**  
✔ **Used for dynamic content**  
✔ **Accessed using `props` in functional components**

---

## **🔹 2️⃣ State**

State is **mutable (changeable) data** managed **inside a component**. It allows components to respond to user actions.

### 🔹 **Example of State (using Hooks in Functional Component):**

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0); // State variable

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
```

### ✅ **Key Points About State:**

✔ **Managed inside the component**  
✔ **Mutable (can change over time using `useState`)**  
✔ **Used for dynamic, interactive components**  
✔ **Triggers re-renders when updated**

---

## **🔄 Props vs. State: Key Differences**

| Feature              | **Props** 🟦                            | **State** 🟨                           |
| -------------------- | --------------------------------------- | -------------------------------------- |
| **Where It’s Used**  | Passed **from parent to child**         | Managed **inside the component**       |
| **Mutability**       | Immutable (cannot be changed)           | Mutable (can be updated)               |
| **Who Controls It?** | Controlled by **parent component**      | Controlled by **the component itself** |
| **Usage**            | Pass data, functions, or configurations | Handle dynamic changes & UI updates    |

---

## **📌 When to Use Props vs. State?**

- ✅ **Use Props** when passing **static data** or functions from a parent to a child.
- ✅ **Use State** when managing **dynamic data** inside a component (like user input, API responses, etc.).

