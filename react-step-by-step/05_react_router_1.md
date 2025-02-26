# ✅ **React Router v6 Basics**

React Router v6 is a powerful library for handling navigation in **React Single Page Applications (SPAs)**. It allows users to move between different views (pages) without a full page reload.

---

## 🔹 **1️⃣ Installing React Router**

Before using React Router, install it in your React project:

```bash
npm install react-router-dom
```

---

## 🔹 **2️⃣ Setting Up React Router**

To use routing, wrap your app inside a `BrowserRouter` and define routes inside `Routes`.

### ✅ **Basic Routing Example**

```jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `BrowserRouter` wraps the app to enable routing.  
✔️ `Routes` groups multiple `Route` components.  
✔️ `Route` defines a path and the component to render.  
✔️ `Link` provides client-side navigation.

---

## 🔹 **3️⃣ Nested Routes**

You can nest routes inside other components.

### ✅ **Example: Nested Routing**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <nav>
      <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
    </nav>
    <Outlet /> {/* Renders nested routes here */}
  </div>
);

const Profile = () => <h3>Profile Page</h3>;
const Settings = () => <h3>Settings Page</h3>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Home</h2>} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `Outlet` renders nested routes inside the parent component.  
✔️ `Link` navigates to sub-routes (e.g., `/dashboard/profile`).

---

## 🔹 **4️⃣ Route Parameters (Dynamic Routing)**

You can pass **dynamic parameters** in the URL.

### ✅ **Example: Dynamic Routing (`useParams`)**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const User = () => {
  const { id } = useParams(); // Get URL parameter
  return <h2>User ID: {id}</h2>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/user/1">User 1</Link> | <Link to="/user/2">User 2</Link>
      </nav>

      <Routes>
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `:id` is a **URL parameter** (e.g., `/user/1`).  
✔️ `useParams()` retrieves the parameter value.

---

## 🔹 **5️⃣ Redirecting & Navigation (`useNavigate`)**

Use `useNavigate()` to programmatically navigate between pages.

### ✅ **Example: Redirecting Users**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => navigate("/about")}>Go to About</button>
    </div>
  );
};

const About = () => <h2>About Page</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `useNavigate()` is used for **programmatic navigation**.  
✔️ Clicking the button redirects the user to `/about`.

---

## 🔹 **6️⃣ 404 Page (Catch-All Route)**

You can create a **Not Found** page for invalid URLs.

### ✅ **Example: 404 Page Handling**

```jsx
const NotFound = () => <h2>404 - Page Not Found</h2>;

<Routes>
  <Route path="*" element={<NotFound />} />
</Routes>;
```

✔️ `path="*"` catches all unknown routes.  
✔️ Displays a **custom 404 page** when the user visits a non-existing route.

---

## 🔹 **7️⃣ Protecting Routes (Authentication)**

Use route guards to **restrict access** to certain pages.

### ✅ **Example: Protected Route**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const isAuthenticated = false; // Simulated authentication state

const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

const Dashboard = () => <h2>Dashboard (Protected)</h2>;
const Home = () => <h2>Home Page</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `Navigate` redirects unauthenticated users to `/`.  
✔️ `ProtectedRoute` restricts access to `Dashboard`.

---

# 🎯 **Summary of React Router v6 Basics**

| Feature                     | Syntax/Usage                                |
| --------------------------- | ------------------------------------------- |
| **Basic Routing**           | `<Route path="/" element={<Home />} />`     |
| **Navigation**              | `<Link to="/about">About</Link>`            |
| **Nested Routes**           | `<Outlet />` for rendering sub-routes       |
| **Dynamic Routing**         | `useParams()` to get URL parameters         |
| **Programmatic Navigation** | `useNavigate()` for redirection             |
| **404 Handling**            | `<Route path="*" element={<NotFound />} />` |
| **Protected Routes**        | `<Navigate to="/" />` for authentication    |

---
