# ✅ **Dynamic Routing & Nested Routes in React Router**

React Router allows you to create **dynamic routes** that can accept parameters and **nested routes** that help structure your application efficiently.

---

## 🔹 **1️⃣ What is Dynamic Routing?**

Dynamic Routing in React Router allows you to define **URL parameters** in routes. These parameters are placeholders in the URL (e.g., `/user/:id`), allowing different data to be loaded dynamically.

---

## 🔹 **2️⃣ Implementing Dynamic Routes (`useParams`)**

To create dynamic routes, use the `useParams` hook to access the parameters from the URL.

### ✅ **Example: Dynamic Route for User Profiles**

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams(); // Get the dynamic ID from URL
  return <h2>User Profile ID: {id}</h2>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/user/1">User 1</Link> | <Link to="/user/2">User 2</Link>
      </nav>

      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `:id` in `path="/user/:id"` makes the route **dynamic**.  
✔️ `useParams()` extracts the **`id`** from the URL.  
✔️ Clicking **User 1** loads `/user/1`, while **User 2** loads `/user/2`.

---

## 🔹 **3️⃣ Nested Routes (`Outlet`)**

Nested routes allow a **parent component** to contain **child routes**, keeping the app organized.

### ✅ **Example: Nested Dashboard Routes**

```jsx
import React from "react";
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
    <Outlet /> {/* Renders child components */}
  </div>
);

const Profile = () => <h3>Profile Page</h3>;
const Settings = () => <h3>Settings Page</h3>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
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

✔️ `Outlet` renders **nested routes** inside `Dashboard`.  
✔️ `path="dashboard"` is the **parent**, while `profile` & `settings` are **nested routes**.  
✔️ URLs:

- `/dashboard/profile` → Renders `Profile` inside `Dashboard`.
- `/dashboard/settings` → Renders `Settings` inside `Dashboard`.

---

## 🔹 **4️⃣ Combining Dynamic & Nested Routes**

You can combine **dynamic routing** and **nested routes** for powerful routing structures.

### ✅ **Example: Dynamic User Dashboard**

```jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

const UserDashboard = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>User Dashboard - ID: {id}</h2>
      <nav>
        <Link to="profile">Profile</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Nested Routes Render Here */}
    </div>
  );
};

const Profile = () => <h3>Profile Section</h3>;
const Settings = () => <h3>Settings Section</h3>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="user/:id" element={<UserDashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
```

✔️ `/user/:id` is a **dynamic route** (e.g., `/user/101`).  
✔️ Nested routes `/user/101/profile` and `/user/101/settings` are handled by `Outlet`.  
✔️ `useParams()` retrieves the **`id`** for personalized content.

---

## 🎯 **Summary**

| Concept             | Explanation                                                       |
| ------------------- | ----------------------------------------------------------------- |
| **Dynamic Routing** | Use `:param` in route paths and `useParams()` to extract values.  |
| **Nested Routes**   | Use `<Outlet />` to render child components inside parent routes. |
| **Combining Both**  | Nest dynamic routes to create structured, reusable navigation.    |

---

