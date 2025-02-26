# ✅ **useEffect Hook (Side Effects & Lifecycle in Functional Components) in React**

## 🔹 **What is `useEffect`?**

`useEffect` is a **React Hook** that lets you **perform side effects** in **functional components**. It replaces **lifecycle methods** like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` used in class components.

**Common Side Effects include:**  
✅ Fetching data from an API  
✅ Subscribing to events (e.g., window resize, keypress)  
✅ Updating the document title  
✅ Cleaning up resources (e.g., clearing timers, removing event listeners)

---

## 🔹 **Syntax of `useEffect`**

```jsx
useEffect(() => {
  // Side effect code here
}, [dependencies]);
```

### **Parameters:**

1️⃣ **Callback Function (`() => {}`)** – The code to run after rendering.  
2️⃣ **Dependency Array (`[dependencies]`)** – Controls when the effect runs.

---

## 🔹 **1️⃣ Running `useEffect` on Every Render**

If you don’t provide a **dependency array**, `useEffect` runs **after every render**.

### ✅ Example: Logging on every render

```jsx
import React, { useState, useEffect } from "react";

const Logger = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Component rendered! Count: ${count}`);
  });

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Logger;
```

🔹 **Problem:** This effect runs **after every render**, even when it’s not needed.

---

## 🔹 **2️⃣ Running `useEffect` Only Once (Component Did Mount)**

If you pass an **empty dependency array (`[]`)**, the effect runs **only once** after the initial render.

### ✅ Example: Fetching Data Once

```jsx
import React, { useEffect, useState } from "react";

const FetchData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []); // Runs only once

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

✅ `useEffect` runs **only once**, making an API request when the component mounts.

---

## 🔹 **3️⃣ Running `useEffect` on State/Prop Change**

You can pass **specific dependencies** to `useEffect` to control when it runs.

### ✅ Example: Updating Document Title when `count` changes

```jsx
import React, { useEffect, useState } from "react";

const TitleUpdater = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Runs when count changes

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default TitleUpdater;
```

✅ `useEffect` runs **only when `count` changes**, optimizing performance.

---

## 🔹 **4️⃣ Cleanup Function (Component Will Unmount)**

If `useEffect` returns a function, it **cleans up** when the component unmounts.

### ✅ Example: Cleaning up an Event Listener

```jsx
import React, { useState, useEffect } from "react";

const WindowResizer = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  return <h2>Window Width: {width}px</h2>;
};

export default WindowResizer;
```

✅ **Prevents memory leaks** by removing the event listener when the component is removed.

---

## 📌 **Summary: When `useEffect` Runs**

| Effect Type                       | Dependency Array                           | Runs On                   |
| --------------------------------- | ------------------------------------------ | ------------------------- |
| Runs on **every render**          | `useEffect(() => {})`                      | Every state/prop change   |
| Runs **only once** (Mount)        | `useEffect(() => {}, [])`                  | Component Mount           |
| Runs **when dependencies change** | `useEffect(() => {}, [dependency])`        | When `dependency` updates |
| Runs **on unmount (cleanup)**     | `useEffect(() => { return () => {} }, [])` | Component Unmount         |

---

## 🚀 **Conclusion**

- **`useEffect` replaces lifecycle methods** in functional components.
- Use `[]` to **run once**, `[state]` to **run when state changes**, and **return a function** for cleanup.
- **Great for API calls, event listeners, and side effects.**

Would you like a more complex example, like real-time data fetching? 😊
