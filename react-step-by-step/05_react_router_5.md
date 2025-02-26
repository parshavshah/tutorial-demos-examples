# ✅ **Protected & Private Routes in React Router**

Protected (or Private) routes **restrict access** to specific pages unless the user is authenticated (e.g., logged in). If a user is **not authenticated**, they are redirected to a **login page** or another specified route.

---

## 🔹 **1️⃣ What is a Protected Route?**

A **protected route** ensures that only authenticated users can access a specific page.

- If **authenticated** → Show the requested page ✅
- If **not authenticated** → Redirect to login ❌

---

## 🔹 **2️⃣ Creating a Protected Route Component**

A **higher-order component (HOC)** is used to wrap protected pages.

### ✅ **Example: `ProtectedRoute` Component**

```jsx
import { Navigate } from "react-router-dom";

const isAuthenticated = false; // Simulate authentication

const ProtectedRoute = ({ element }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

✔️ **If logged in**, renders the requested page.  
✔️ **If not logged in**, redirects to `/login`.

---

## 🔹 **3️⃣ Using `ProtectedRoute` in React Router**

### ✅ **Example: Protecting Dashboard**

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Home = () => <h2>Home Page</h2>;
const Login = () => <h2>Login Page</h2>;
const Dashboard = () => <h2>Dashboard (Protected)</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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

✔️ Users **cannot** access `/dashboard` unless `isAuthenticated` is `true`.  
✔️ Unauthenticated users are redirected to `/login`.

---

## 🔹 **4️⃣ Protecting Routes Using `useNavigate()`**

Instead of `<Navigate />`, we can use `useNavigate()` for redirection inside components.

### ✅ **Example: Redirect Unauthorized Users**

```jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = false; // Simulating authentication

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <h2>Dashboard</h2>;
};
```

✔️ Uses `useEffect()` to check authentication and redirect dynamically.

---

## 🔹 **5️⃣ Storing Authentication State with `useState` & `Context`**

Instead of hardcoding `isAuthenticated`, use **React Context**.

### ✅ **Example: Context for Authentication**

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

✔️ `AuthContext` manages authentication state.  
✔️ `useAuth()` is a custom hook to access authentication.

---

## 🔹 **6️⃣ Using Context with Protected Routes**

### ✅ **Example: Protecting Routes with Context**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";

const Home = () => <h2>Home Page</h2>;
const Login = () => {
  const { login } = useAuth();
  return <button onClick={login}>Login</button>;
};
const Dashboard = () => <h2>Dashboard (Protected)</h2>;

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

✔️ **Login button updates authentication state**.  
✔️ **ProtectedRoute checks authentication dynamically**.

---

## 🎯 **Summary**

| Feature                         | Method                                        |
| ------------------------------- | --------------------------------------------- |
| **Basic Protection**            | `ProtectedRoute` component                    |
| **Redirect Unauthorized Users** | `<Navigate to="/login" />` or `useNavigate()` |
| **Authentication Context**      | `AuthContext` + `useAuth()`                   |
| **Dynamic Login/Logout**        | `setIsAuthenticated(true/false)` in context   |

---
