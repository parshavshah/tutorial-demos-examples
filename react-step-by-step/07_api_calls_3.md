# **🔹 Async/Await with React for API Calls & Async Handling** 🚀

When handling **asynchronous operations** (such as API calls) in React, using **`async/await`** provides a cleaner and more readable alternative to `.then().catch()` syntax.

Let's explore how to use **`async/await`** properly in React, including **fetching data, handling errors, using `useEffect`, and best practices.** ✅

---

## **🔹 1. What is `async/await`?**

`async/await` is a modern way to **handle promises** in JavaScript. It makes asynchronous code look more like synchronous code, improving readability.

### **🔹 Basic Example of `async/await`**

```js
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData(); // Call the function
```

> ✅ **`async` keyword** makes the function asynchronous.  
> ✅ **`await`** pauses execution until the promise resolves.  
> ✅ **`try/catch`** handles errors gracefully.

---

## **🔹 2. Fetching API Data in React using `useEffect` + `async/await`**

In React, API calls are usually made when a component **mounts** (loads for the first time).  
Since `useEffect()` **does not directly support async functions**, we handle it **inside `useEffect`** using an **inner async function**.

### **🔹 Example: Fetching Data on Component Mount**

```jsx
import { useEffect, useState } from "react";

const AsyncAwaitExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call async function inside useEffect
  }, []); // Empty dependency array = runs only on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default AsyncAwaitExample;
```

### **🔹 Key Points:**

✅ **`useEffect()` triggers API call on mount** (`[]`).  
✅ **Handles errors** using `try/catch`.  
✅ **Ensures proper loading state** (`loading` and `error` checks).  
✅ **Uses `async` function inside `useEffect()`** to keep it clean.

---

## **🔹 3. Using `async/await` with Axios (Easier Alternative to Fetch API)**

Axios simplifies API calls by **automatically parsing JSON** and **providing better error handling**.

### **🔹 Example: Fetching Data with Axios**

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
        setData(response.data); // Axios automatically parses JSON
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

✅ **Auto JSON Parsing** (No need for `response.json()`).  
✅ **Better Error Handling** (Can check `error.response`, `error.request`).  
✅ **Supports Timeouts, Interceptors, and Request Cancellation**.

---

## **🔹 4. Fetching Data When State Changes (`useEffect` with Dependencies)**

Sometimes, you need to **fetch data when a state or prop changes**.

### **🔹 Example: Fetching Data When `postId` Changes**

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
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]); // Runs when postId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithDependencies;
```

### **🔹 Key Takeaways:**

✅ **`useEffect([postId])` ensures data is re-fetched when `postId` changes.**  
✅ **Prevents unnecessary fetches if `postId` is undefined.**

---

## **🔹 5. Canceling API Calls to Prevent Memory Leaks**

If a component unmounts before the API request completes, we should **cancel the request** to avoid **memory leaks**.

### **🔹 Cancel API Calls using `AbortController` (Fetch API)**

```jsx
import { useEffect, useState } from "react";

const FetchWithAbort = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create AbortController
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          {
            signal: controller.signal, // Attach signal
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
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

## **🔹 Conclusion: Best Practices for Async/Await in React**

✅ **Use `useEffect()` to trigger API calls on mount or when dependencies change.**  
✅ **Use `async/await` inside `useEffect()` (not directly in it).**  
✅ **Handle errors properly using `try/catch`.**  
✅ **Use `AbortController` (for Fetch) or `CancelToken` (for Axios) to prevent memory leaks.**  
✅ **Use Axios if you want easier JSON parsing, better error handling, and interceptors.**

