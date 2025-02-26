# ✅ **Redirects & Navigation in React Router**

In **React Router**, you can **redirect users** and **navigate between pages** using different techniques.

---

## 🔹 **1️⃣ Navigation using `<Link>` & `<NavLink>`**

Instead of using `<a>` tags (which cause full page reloads), React Router provides:

### ✅ **Example: Using `<Link>`**

```jsx
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

✔️ `<Link>` prevents full-page reloads and enables **client-side navigation**.  
✔️ Clicking **"About"** navigates to `/about`.

### ✅ **Example: Using `<NavLink>` (Active Styling)**

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/about"
  style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}
>
  About
</NavLink>;
```

✔️ `<NavLink>` adds **active class styling** for the current page.

---

## 🔹 **2️⃣ Programmatic Navigation (`useNavigate`)**

Use the `useNavigate()` hook to **redirect users dynamically** based on conditions.

### ✅ **Example: Redirect on Button Click**

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

✔️ `useNavigate()` allows navigation **without using `<Link>`**.  
✔️ Clicking the button redirects to `/about`.

---

## 🔹 **3️⃣ Redirecting (Replacing History)**

Use `{ replace: true }` with `useNavigate()` to **replace** the current entry in history.

### ✅ **Example: Replacing History**

```jsx
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    // After login, redirect to dashboard
    navigate("/dashboard", { replace: true });
  };

  return <button onClick={handleLogin}>Login</button>;
};
```

✔️ `replace: true` prevents users from going **back to the login page** after logging in.

---

## 🔹 **4️⃣ Redirecting Unauthorized Users (`Navigate`)**

Use `<Navigate />` to **redirect unauthenticated users**.

### ✅ **Example: Protecting Routes**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const isAuthenticated = false; // Simulating authentication

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

✔️ If `isAuthenticated` is **false**, users are **redirected to Home (`/`)**.  
✔️ `<Navigate to="/" />` handles **redirecting**.

---

## 🎯 **Summary**

| Feature                           | Method                                      |
| --------------------------------- | ------------------------------------------- |
| **Basic Navigation**              | `<Link to="/about">About</Link>`            |
| **Active Navigation Styling**     | `<NavLink to="/about">` (active styling)    |
| **Programmatic Navigation**       | `useNavigate()`                             |
| **Redirect with History Replace** | `navigate("/dashboard", { replace: true })` |
| **Protecting Routes**             | `<Navigate to="/" />` inside a function     |

---

