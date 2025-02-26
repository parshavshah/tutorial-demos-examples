# **🔹 Fetch API vs. Axios for API Calls & Async Handling in React**

When making **API requests** in a React app, two popular options are:  
✅ **Fetch API** (built-in browser method)  
✅ **Axios** (a popular third-party HTTP client)

Let’s compare **Fetch API vs. Axios** in terms of **features, pros/cons, and use cases** with examples. 🚀

---

## **🔹 1. Fetch API (Built-in Browser Method)**

The **Fetch API** is a modern way to make HTTP requests in JavaScript. It’s built into browsers, so **no extra installation is needed**.

### **🔹 Basic Fetch Request Example**

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => console.log(data)) // Handle data
  .catch((error) => console.error("Error:", error)); // Handle errors
```

> **📝 Key Points:**
>
> - Uses **Promises** for async operations.
> - Returns a **Response object**, which needs to be converted to JSON.
> - Errors (like network failures) must be handled manually.

---

## **🔹 2. Axios (Third-Party Library)**

**Axios** is an external package that simplifies API calls with more features.  
**Installation:**

```sh
npm install axios
```

### **🔹 Basic Axios Request Example**

```js
import axios from "axios";

axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data)) // Axios automatically parses JSON
  .catch((error) => console.error("Error:", error));
```

> **📝 Key Points:**
>
> - Automatically converts response to JSON (no `response.json()` needed).
> - Better **error handling** (handles both request & response errors).
> - Supports **cancellation, interceptors, and timeouts**.

---

## **🔹 Fetch vs. Axios: Feature Comparison**

| Feature                             | Fetch API                            | Axios                                |
| ----------------------------------- | ------------------------------------ | ------------------------------------ |
| **Built-in?**                       | ✅ Yes (No install needed)           | ❌ No (Requires `npm install axios`) |
| **Auto JSON Parsing?**              | ❌ No (`response.json() needed`)     | ✅ Yes (Directly `response.data`)    |
| **Error Handling**                  | ❌ Must check `response.ok` manually | ✅ Handles errors automatically      |
| **Request & Response Interceptors** | ❌ No                                | ✅ Yes                               |
| **Cancel Requests**                 | ❌ Complex (`AbortController`)       | ✅ Simple (`axios.CancelToken`)      |
| **Timeout Handling**                | ❌ No (Requires `setTimeout()`)      | ✅ Built-in (`timeout: 5000`)        |
| **Supports Older Browsers**         | ✅ Yes                               | ❌ No (Needs polyfill for IE11)      |

---

## **🔹 3. Handling Errors**

### **🔹 Fetch API - Error Handling**

Fetch **doesn’t reject on HTTP errors** (like `404` or `500`), so you must check `response.ok`.

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch Error:", error));
```

### **🔹 Axios - Error Handling**

Axios **automatically detects errors** and provides more details.

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => console.log(response.data))
  .catch((error) => {
    if (error.response) {
      console.error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      console.error("No Response Received:", error.request);
    } else {
      console.error("Axios Error:", error.message);
    }
  });
```

---

## **🔹 4. Making POST Requests**

### **🔹 Fetch API - POST Request**

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Post", body: "This is the body" }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch Error:", error));
```

### **🔹 Axios - POST Request**

```js
axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    title: "New Post",
    body: "This is the body",
  })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Axios Error:", error));
```

> **📝 Axios automatically sets `Content-Type: application/json`** (unlike Fetch).

---

## **🔹 5. Handling Async/Await Requests**

Both **Fetch API** and **Axios** support `async/await`.

### **🔹 Fetch API with Async/Await**

```js
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};
fetchData();
```

### **🔹 Axios with Async/Await**

```js
const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Axios Error:", error);
  }
};
fetchData();
```

> **📝 Axios version is shorter because it auto-handles JSON parsing & errors.**

---

## **🔹 6. Canceling Requests**

### **🔹 Fetch API - Cancel Request**

Using `AbortController` (more complex).

```js
const controller = new AbortController();
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  signal: controller.signal,
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch Error:", error));

// Cancel request
controller.abort();
```

### **🔹 Axios - Cancel Request**

Axios makes cancellation easier.

```js
const source = axios.CancelToken.source();

axios
  .get("https://jsonplaceholder.typicode.com/posts/1", {
    cancelToken: source.token,
  })
  .then((response) => console.log(response.data))
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    }
  });

// Cancel request
source.cancel("Operation canceled by the user.");
```

---

## **🔹 7. Setting a Timeout**

### **🔹 Fetch API - Timeout (Manual)**

```js
const fetchWithTimeout = (url, timeout = 5000) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);

  return fetch(url, { signal: controller.signal });
};

fetchWithTimeout("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch Timeout Error:", error));
```

### **🔹 Axios - Timeout (Built-in)**

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts/1", { timeout: 5000 })
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Axios Timeout Error:", error));
```

> **📝 Axios has built-in `timeout` handling, while Fetch requires manual setup.**

---

## **🔹 Which One Should You Use?**

| **Use Case**               | **Fetch API**                  | **Axios**               |
| -------------------------- | ------------------------------ | ----------------------- |
| **Basic API Calls**        | ✅ Good                        | ✅ Good                 |
| **Built-in (No Install)**  | ✅ Yes                         | ❌ No                   |
| **Automatic JSON Parsing** | ❌ No                          | ✅ Yes                  |
| **Error Handling**         | ❌ Manual                      | ✅ Automatic            |
| **Request Interceptors**   | ❌ No                          | ✅ Yes                  |
| **Cancel Requests**        | ❌ Complex (`AbortController`) | ✅ Easy (`CancelToken`) |
| **Timeout Handling**       | ❌ Manual (`setTimeout()`)     | ✅ Built-in (`timeout`) |

---

## **🔹 Conclusion**

✅ **Use Fetch API if:**  
✔ You need a **lightweight** solution without extra dependencies.  
✔ You are making simple **GET requests**.

✅ **Use Axios if:**  
✔ You want **automatic JSON parsing & better error handling**.  
✔ You need **timeouts, request cancellation, or interceptors**.

