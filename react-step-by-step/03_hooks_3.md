# ✅ **`useContext` – Avoid Prop Drilling in React**

## 🔹 **What is `useContext`?**

In React, **prop drilling** happens when **props are passed down multiple levels** to reach deeply nested components. The `useContext` hook **solves this problem** by allowing **direct access to shared state** without passing props manually at every level.

👉 **`useContext` is used for global state management** in React applications.

---

## 🔹 **How `useContext` Works?**

1️⃣ **Create a Context** using `React.createContext()`.  
2️⃣ **Provide a value** to the Context using `<Context.Provider>`.  
3️⃣ **Consume the Context** using `useContext(Context)`.

---

## 🔹 **Example: Avoiding Prop Drilling Using `useContext`**

### ❌ **Problem: Prop Drilling Without `useContext`**

```jsx
import React, { useState } from "react";

// Parent Component
const App = () => {
  const [user, setUser] = useState("John Doe");

  return <Parent user={user} />;
};

// Passed down through multiple components (prop drilling)
const Parent = ({ user }) => <Child user={user} />;
const Child = ({ user }) => <GrandChild user={user} />;
const GrandChild = ({ user }) => <h2>Welcome, {user}!</h2>;

export default App;
```

🔴 **Problem:** Every component has to **pass down `user`** manually, even if they don’t use it.

---

### ✅ **Solution: Using `useContext` (No Prop Drilling!)**

```jsx
import React, { useState, createContext, useContext } from "react";

// 1️⃣ Create Context
const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState("John Doe");

  return (
    // 2️⃣ Provide Context Value
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
};

const Parent = () => <Child />;
const Child = () => <GrandChild />;

// 3️⃣ Consume Context in any component (No prop drilling)
const GrandChild = () => {
  const user = useContext(UserContext);
  return <h2>Welcome, {user}!</h2>;
};

export default App;
```

✔️ **No need to pass `user` through intermediate components!**  
✔️ **Directly accessed using `useContext(UserContext)`** in `GrandChild`.

---

## 🔹 **When to Use `useContext`?**

✅ When multiple components **need access to the same global data** (e.g., user authentication, theme, language).  
✅ When **avoiding prop drilling** in deeply nested components.  
✅ When **working with state management libraries** like Redux or Zustand.
