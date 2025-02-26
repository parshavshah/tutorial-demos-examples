# **🔹 Handling API Calls with `useEffect` for Async Handling in React** 🚀

When working with API calls in React, it's common to **fetch data** when a component mounts or when some state changes. The best way to do this is by using **`useEffect()`** along with **Fetch API or Axios**.

Let’s break down how to properly handle API calls with `useEffect()`, including **best practices, error handling, and optimizations**. ✅

---

## **🔹 1. Basic API Call using `useEffect` and Fetch API**

```jsx
import { useEffect, useState } from "react";

const FetchExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array = runs only on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchExample;
```

### **🔹 Explanation:**

✅ `useState()` manages state (`data`, `loading`, `error`).  
✅ `useEffect()` makes the API call **on component mount** (`[]`).  
✅ **Handles errors** with `catch()`.  
✅ **Checks for `loading` and `error`** before rendering data.

---

## **🔹 2. Using `async/await` Inside `useEffect()` (Best Practice)**

Using `async/await` directly inside `useEffect()` is **not recommended** because `useEffect` **should not return a Promise**. Instead, use an **async function inside it**:

```jsx
import { useEffect, useState } from "react";

const FetchWithAsync = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithAsync;
```

### **🔹 Why This is Better?**

✅ `async function fetchData()` keeps `useEffect()` **clean**.  
✅ Uses `try/catch` for **better error handling**.  
✅ `finally` ensures `setLoading(false)` runs after success/error.

---

## **🔹 3. Using Axios with `useEffect()`**

Axios simplifies API calls by **automatically parsing JSON** and **handling errors better**.

### **Axios API Call Example**

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

const AxiosExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        setData(response.data); // No need for response.json()
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default AxiosExample;
```

### **🔹 Why Use Axios?**

✅ **No need to manually parse JSON** (`response.json()`).  
✅ **Better error handling** (`error.response`, `error.request`).  
✅ **Supports timeouts, request cancellation, and interceptors**.

---

## **🔹 4. Handling API Calls with Dependencies (`useEffect` with Dependencies)**

Sometimes, you need to **refetch data** when a state or prop changes.

### **Example: Fetching Data When `id` Changes**

```jsx
import { useEffect, useState } from "react";

const FetchWithDependencies = ({ postId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return; // Prevent unnecessary fetch

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]); // Fetch data when postId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithDependencies;
```

### **🔹 Key Points:**

✅ **`useEffect([postId])` triggers re-fetch when `postId` changes**.  
✅ **Prevents unnecessary fetch** if `postId` is `undefined`.

---

## **🔹 5. Canceling API Calls to Avoid Memory Leaks**

If a component unmounts before the API call completes, **you should cancel the request** to avoid updating state on an unmounted component.

### **🔹 Cancel API Calls with `AbortController` (Fetch API)**

```jsx
import { useEffect, useState } from "react";

const FetchWithAbort = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            signal: controller.signal, // Attach signal
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup function cancels request
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithAbort;
```

### **🔹 Why Use `AbortController`?**

✅ Prevents **state updates on unmounted components**.  
✅ Avoids **memory leaks** when API requests are **slow**.

---

## **🔹 Conclusion: Best Practices for API Calls in React**

✅ **Use `useEffect()` to trigger API calls on mount or when dependencies change.**  
✅ **Use `async/await` inside `useEffect()` (not directly in it).**  
✅ **Handle errors properly using `try/catch`.**  
✅ **Use `AbortController` (for Fetch) or `CancelToken` (for Axios) to prevent memory leaks.**  
✅ **Use Axios if you want easier JSON parsing, better error handling, and interceptors.**

