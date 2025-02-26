# ✅ **React Hooks: `useState`, `useEffect`, and `useRef`**

React Hooks allow functional components to have state, side effects, and references to DOM elements. The three most commonly used hooks are:

1️⃣ **`useState`** → Manages state in a functional component.  
2️⃣ **`useEffect`** → Handles side effects (e.g., API calls, event listeners).  
3️⃣ **`useRef`** → Stores references to DOM elements or values that persist across renders.

---

## 🔹 **1️⃣ useState Hook (State Management)**

`useState` lets you **store and update state** inside functional components.

### ✅ **Syntax**

```jsx
const [state, setState] = useState(initialValue);
```

✔️ `state` → Holds the current state value.  
✔️ `setState(newValue)` → Updates the state and triggers re-rendering.  
✔️ `initialValue` → The starting value of the state.

### ✅ **Example: Counter App**

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

✔️ Updates the `count` state when clicking the button.

---

## 🔹 **2️⃣ useEffect Hook (Side Effects & Lifecycle in Functional Components)**

`useEffect` allows you to **perform side effects** in functional components. It replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

### ✅ **Syntax**

```jsx
useEffect(() => {
  // Side effect logic
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]);
```

✔️ **Runs after the component renders.**  
✔️ The **dependency array** controls when it runs.

### ✅ **Example: Fetch Data on Mount**

```jsx
import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []); // Runs only once on mount

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default FetchData;
```

✔️ Fetches data **only once** on mount (`[]` dependency array).

---

### ✅ **useEffect Cleanup Function**

Used when adding/removing event listeners or timers.

```jsx
useEffect(() => {
  const handleResize = () => console.log(window.innerWidth);
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize); // Cleanup on unmount
  };
}, []);
```

✔️ **Prevents memory leaks** by removing event listeners on unmount.

---

## 🔹 **3️⃣ useRef Hook (DOM Manipulation & Persisting Values)**

`useRef` allows you to:  
✅ Reference DOM elements directly.  
✅ Store values that persist across renders **without causing re-renders**.

### ✅ **Syntax**

```jsx
const refContainer = useRef(initialValue);
```

✔️ `refContainer.current` stores the **current value**.  
✔️ Unlike `useState`, updating `.current` **does not trigger a re-render**.

---

### ✅ **Example: Accessing DOM Elements**

```jsx
import React, { useRef } from "react";

const InputFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Focuses the input field
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
};

export default InputFocus;
```

✔️ Clicking the button **directly focuses the input field**.

---

### ✅ **Example: Persisting Values Without Re-Rendering**

```jsx
import React, { useState, useRef } from "react";

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const renders = useRef(0);

  renders.current += 1; // Updating ref doesn't cause re-render

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <p>Component re-rendered: {renders.current} times</p>
    </div>
  );
};

export default ClickCounter;
```

✔️ `renders.current` updates **without triggering re-renders**.

---

## 📌 **Comparison: `useState` vs. `useRef` vs. `useEffect`**

| Hook        | Purpose                                                            | Triggers Re-render?           |
| ----------- | ------------------------------------------------------------------ | ----------------------------- |
| `useState`  | Manages component state                                            | ✅ Yes                        |
| `useEffect` | Handles side effects (e.g., API calls, event listeners)            | ✅ Yes (on dependency change) |
| `useRef`    | References DOM elements & stores values without causing re-renders | ❌ No                         |

---

## 🚀 **Conclusion**

✔️ **`useState`** → For managing state inside components.  
✔️ **`useEffect`** → For handling side effects like API calls and event listeners.  
✔️ **`useRef`** → For accessing DOM elements and persisting values across renders **without causing re-renders**.
