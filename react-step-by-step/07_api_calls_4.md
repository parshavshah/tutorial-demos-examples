# **🔹 Handling Errors in API Requests for API Calls & Async Handling in React** 🚀

When making API calls in React, handling errors properly is **crucial** for providing a good user experience. Without error handling, users might see **blank screens, broken UI, or no feedback** when something goes wrong.

Let’s explore how to **handle errors in API requests** effectively using **`try/catch`, HTTP status checks, Axios error handling, and global error handling strategies.** ✅

---

## **🔹 1. Basic Error Handling with Fetch API**

The Fetch API does **not automatically reject** HTTP errors (e.g., `404 Not Found`, `500 Internal Server Error`). We need to manually check for `response.ok`.

### **🔹 Example: Handling API Errors in Fetch**

```jsx
import { useEffect, useState } from "react";

const FetchWithErrorHandling = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/invalid-endpoint"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
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
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return <div>{data?.title}</div>;
};

export default FetchWithErrorHandling;
```

### **🔹 Key Takeaways:**

✅ **Checks `response.ok`** to detect HTTP errors (`404`, `500`).  
✅ **Throws an error manually** if the response isn’t OK.  
✅ **`try/catch` handles network failures.**  
✅ **Always sets `loading` to `false` in `finally`.**

---

## **🔹 2. Handling Errors with Axios (Simplified)**

Axios **automatically detects HTTP errors** and provides an easier way to handle them.

### **🔹 Example: Handling API Errors in Axios**

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

const AxiosWithErrorHandling = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/invalid-endpoint"
        );
        setData(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status outside 2xx
          setError(`Error ${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
          // Request was made but no response received
          setError("No response received from the server");
        } else {
          // Other errors
          setError(error.message);
        }
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

export default AxiosWithErrorHandling;
```

### **🔹 Axios Error Handling Breakdown:**

✅ **`error.response`** → Server responded with an error (`404`, `500`).  
✅ **`error.request`** → No response from the server (Network issue).  
✅ **`error.message`** → Other errors like incorrect request setup.

---

## **🔹 3. Displaying Meaningful Error Messages**

Instead of generic error messages, provide **user-friendly** messages.

### **🔹 Example: Improving User Feedback**

```jsx
const getErrorMessage = (status) => {
  switch (status) {
    case 404:
      return "The requested resource was not found.";
    case 500:
      return "Internal server error. Please try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
};

// Inside the error handling section:
if (error.response) {
  setError(getErrorMessage(error.response.status));
}
```

> **✅ Helps users understand the issue instead of showing raw status codes.**

---

## **🔹 4. Retrying API Calls on Failure**

If an API request fails due to **temporary issues**, retrying the request might help.

### **🔹 Example: Retrying API Requests**

```jsx
const fetchDataWithRetry = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Retrying API call (${i + 1}/${retries})...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
};
```

> **✅ Useful for handling temporary network failures.**

---

## **🔹 5. Global Error Handling (Centralized)**

Instead of handling errors in every API call, **centralized error handling** makes code **cleaner**.

### **🔹 Example: Creating an API Wrapper**

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000, // Timeout after 5s
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `API Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
```

> **✅ Automatically logs errors & handles retries globally.**

---

## **🔹 6. Handling Errors in React Query (Best for Large Apps)**

If you're using **React Query**, it provides built-in error handling.

### **🔹 Example: Handling Errors with React Query**

```jsx
import { useQuery } from "react-query";
import axios from "axios";

const fetchPost = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  return response.data;
};

const ReactQueryExample = () => {
  const { data, error, isLoading } = useQuery("post", fetchPost);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return <div>{data?.title}</div>;
};

export default ReactQueryExample;
```

> **✅ Built-in error handling & retries.**

---

## **🔹 Conclusion: Best Practices for API Error Handling**

✅ **Always use `try/catch` with `async/await` to catch errors.**  
✅ **Check `response.ok` when using Fetch API.**  
✅ **Use Axios for automatic error detection.**  
✅ **Provide user-friendly error messages (not just status codes).**  
✅ **Implement retries for temporary failures.**  
✅ **Use a centralized API wrapper for cleaner code.**  
✅ **Consider React Query for automatic error handling in large apps.**

