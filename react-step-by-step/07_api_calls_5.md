# **🔹 Loading & Error State Management for API Calls & Async Handling in React** 🚀

When making API requests in React, managing **loading and error states** properly ensures a **smooth user experience**. If not handled well, users might see **blank screens, frozen UI, or incorrect data**.

---

## **🔹 1. Why Manage Loading & Error States?**

✅ **Loading State** → Shows feedback while data is being fetched.  
✅ **Error State** → Notifies users if the API request fails.  
✅ **Better User Experience** → Avoids confusion with clear status indicators.

---

## **🔹 2. Handling Loading & Errors with `useState` & `useEffect`**

A common approach is to use **`useState`** for tracking **loading, error, and data states**.

### **🔹 Example: Fetch API with Loading & Error States**

```jsx
import { useEffect, useState } from "react";

const FetchWithLoadingAndError = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading before request
      setError(null); // Reset error state
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading after request completes
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>; // Show error state

  return <div>{data?.title}</div>; // Show data when available
};

export default FetchWithLoadingAndError;
```

### **🔹 Key Takeaways:**

✅ **`loading` starts as `true` and turns `false` after request completes.**  
✅ **`error` is reset before each request & updated if an error occurs.**  
✅ **Displays a loading message until data is available.**  
✅ **Handles failed API requests gracefully.**

---

## **🔹 3. Handling Loading & Errors with Axios (Simplified)**

Axios automatically detects HTTP errors and makes error handling easier.

### **🔹 Example: Axios with Loading & Error States**

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

const AxiosWithLoadingAndError = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        setData(response.data);
      } catch (err) {
        setError(err.response?.statusText || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default AxiosWithLoadingAndError;
```

✅ **Axios simplifies error handling with `err.response`**  
✅ **Handles server & network errors better than Fetch API**

---

## **🔹 4. Showing a Loading Spinner Instead of Text**

Instead of just displaying "Loading...", use a **spinner** for a better UI experience.

### **🔹 Example: Using a Spinner for Loading State**

```jsx
const Spinner = () => <div className="loader"></div>; // Simple loader component

const FetchWithSpinner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />; // Show spinner
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithSpinner;
```

✅ **Better UI with spinners instead of plain text**  
✅ **Can use libraries like `react-spinners` or `mui` for advanced loaders**

---

## **🔹 5. Handling Multiple API Calls with Loading & Error States**

Sometimes, multiple API calls are needed **at the same time**. Instead of **separate states**, use a **single state object**.

### **🔹 Example: Fetching Multiple APIs with a Shared State**

```jsx
const MultiApiFetch = () => {
  const [state, setState] = useState({
    posts: null,
    users: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true, error: null });

      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts/1"),
          fetch("https://jsonplaceholder.typicode.com/users/1"),
        ]);

        if (!postsRes.ok || !usersRes.ok) throw new Error("API request failed");

        const [posts, users] = await Promise.all([
          postsRes.json(),
          usersRes.json(),
        ]);

        setState({ posts, users, loading: false, error: null });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };

    fetchData();
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p style={{ color: "red" }}>Error: {state.error}</p>;

  return (
    <div>
      <h3>Post: {state.posts?.title}</h3>
      <h3>User: {state.users?.name}</h3>
    </div>
  );
};

export default MultiApiFetch;
```

✅ **Efficiently handles multiple API requests in parallel**  
✅ **Uses a shared `state` object to manage loading & errors**

---

## **🔹 6. Global Loading & Error State Management (Better for Large Apps)**

Instead of handling `loading` & `error` in every component, use **context or Redux**.

### **🔹 Example: Global Loading/Error State using Context API**

```jsx
import { createContext, useContext, useState } from "react";

// Create a Context
const ApiContext = createContext();

// Provider Component
export const ApiProvider = ({ children }) => {
  const [state, setState] = useState({ loading: false, error: null });

  return (
    <ApiContext.Provider value={{ state, setState }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom Hook
export const useApi = () => useContext(ApiContext);
```

Now, use the **global loading/error state** anywhere:

```jsx
const ExampleComponent = () => {
  const { state, setState } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      setState({ loading: true, error: null });
      try {
        await fetch("https://jsonplaceholder.typicode.com/posts/1");
        setState({ loading: false, error: null });
      } catch (error) {
        setState({ loading: false, error: "Failed to fetch" });
      }
    };

    fetchData();
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p style={{ color: "red" }}>Error: {state.error}</p>;

  return <p>Data loaded successfully!</p>;
};
```

✅ **Single place to manage loading & errors for multiple API calls**

---

## **🔹 Conclusion: Best Practices for Loading & Error States**

✅ **Use `useState` for local loading/error handling in small apps.**  
✅ **Use a global state (Context API, Redux) for large apps.**  
✅ **Show loading spinners instead of plain text.**  
✅ **Handle multiple API calls efficiently with `Promise.all()`.**  
✅ **Use Axios for automatic error detection.**
