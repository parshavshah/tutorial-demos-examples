# ✅ **Custom Hooks in React (Reusability & Best Practices)**

## 🔹 **What Are Custom Hooks?**

A **Custom Hook** is a **reusable function** in React that **encapsulates logic** using hooks (`useState`, `useEffect`, `useRef`, etc.).  
👉 **Purpose:** Helps **avoid code duplication** and **improves maintainability** by extracting reusable logic from components.

---

## 🔹 **Why Use Custom Hooks?**

✅ **Reusability** → Avoid repeating the same logic in multiple components.  
✅ **Separation of Concerns** → Keeps components clean by moving logic elsewhere.  
✅ **Better Readability & Maintainability** → Logic is organized in independent functions.

---

## 🔹 **Example 1: Custom Hook for Fetching Data (`useFetch`)**

A common scenario in React apps is fetching data from an API. Instead of duplicating the logic, we can create a **custom hook**:

### ✅ **Create `useFetch.js`**

```jsx
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-fetch if URL changes

  return { data, loading, error };
};

export default useFetch;
```

### ✅ **Use in a Component**

```jsx
import React from "react";
import useFetch from "./useFetch";

const Users = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Users;
```

✔️ **Encapsulates API logic** → No need to write `useEffect` and `fetch` logic repeatedly.  
✔️ **Reusable across multiple components** (e.g., `useFetch` can be used for posts, products, etc.).

---

## 🔹 **Example 2: Custom Hook for Local Storage (`useLocalStorage`)**

A common use case is storing values in **local storage**.

### ✅ **Create `useLocalStorage.js`**

```jsx
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
```

### ✅ **Use in a Component**

```jsx
import React from "react";
import useLocalStorage from "./useLocalStorage";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <h2>Current Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
```

✔️ **Stores theme preference** in `localStorage` so it persists between page reloads.  
✔️ **Reusable for other data** (e.g., user settings, form inputs).

---

## 🔹 **Best Practices for Custom Hooks**

✅ **Use the `use` prefix** → Custom hooks **must start with `use`** (e.g., `useAuth`, `useTheme`).  
✅ **Keep them focused** → Each hook should solve **one** specific problem.  
✅ **Use existing hooks** → Custom hooks should internally use `useState`, `useEffect`, etc.  
✅ **Make them reusable** → Avoid app-specific logic; keep hooks generic for reusability.  
✅ **Return necessary values** → Only return state, functions, or computed values needed by components.

---

## 🚀 **When to Use Custom Hooks?**

✅ When **the same logic is used in multiple components** (e.g., API fetching, form validation).  
✅ When **state logic is complex** and needs to be encapsulated separately.  
✅ When **working with browser APIs** (e.g., `localStorage`, `navigator.geolocation`).

