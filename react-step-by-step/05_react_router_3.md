# ✅ **Route Params & Query Parameters in React Router**

In **React Router**, you can pass data through **Route Parameters** and **Query Parameters** to dynamically handle content.

---

## 🔹 **1️⃣ Route Parameters (`useParams`)**

Route parameters are **dynamic segments** in the URL that allow passing values directly in the path.

### ✅ **Example: Route Parameters**

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Get the dynamic value from URL
  return <h2>Product ID: {id}</h2>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/product/101">Product 101</Link> |{" "}
        <Link to="/product/202">Product 202</Link>
      </nav>

      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `:id` in `/product/:id` makes it a **dynamic route**.  
✔️ `useParams()` retrieves the `id` from the URL.  
✔️ Clicking **Product 101** goes to `/product/101`, and `ProductDetail` displays **Product ID: 101**.

---

## 🔹 **2️⃣ Query Parameters (`useSearchParams`)**

Query parameters allow you to pass **key-value pairs** in the URL after a `?`.

### ✅ **Example: Query Parameters**

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useSearchParams,
} from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get query parameter value
  return <h2>Search Query: {query}</h2>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/search?q=react">Search React</Link> |
        <Link to="/search?q=javascript">Search JavaScript</Link>
      </nav>

      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ **`?q=react`** is a **query parameter** in `/search?q=react`.  
✔️ `useSearchParams()` extracts query parameters.  
✔️ Clicking **Search React** displays **Search Query: react**.

---

## 🔹 **3️⃣ Difference Between Route Params & Query Parameters**

| Feature             | Route Parameters (`useParams`)           | Query Parameters (`useSearchParams`) |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| **Format**          | `/product/:id` → `/product/101`          | `/search?q=react&page=2`             |
| **Use Case**        | Identifying resources (e.g., Product ID) | Filtering, sorting, pagination       |
| **Multiple Values** | Limited to path structure                | Supports multiple key-value pairs    |
| **Access Method**   | `useParams()`                            | `useSearchParams()`                  |

---

# 🎯 **Summary**

✔ **Route Parameters** are part of the **URL path** (e.g., `/product/101`).  
✔ **Query Parameters** are **key-value pairs** added after `?` (e.g., `/search?q=react`).  
✔ **Use `useParams()`** for **route params** and **useSearchParams()** for **query parameters**.

---
