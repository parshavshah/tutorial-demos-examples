## ✅ **Component Lifecycle Methods in React**

In React, **component lifecycle methods** are special methods that run at different stages of a component’s life. They are mainly used in **class components** to handle events like mounting, updating, and unmounting.

---

## **🔹 1️⃣ Lifecycle Phases**

React components go through **three main phases**:

| Phase          | Description                                     |
| -------------- | ----------------------------------------------- |
| **Mounting**   | Component is created and added to the DOM       |
| **Updating**   | Component re-renders when props or state change |
| **Unmounting** | Component is removed from the DOM               |

---

## **🔹 2️⃣ Lifecycle Methods in Class Components**

### ✅ **1. Mounting Phase (Component Creation)**

Runs when the component **first appears in the UI**.

| Method                                          | Description                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| `constructor()`                                 | Initializes state and binds methods                               |
| `static getDerivedStateFromProps(props, state)` | Syncs state with props before rendering                           |
| `render()`                                      | Returns JSX (mandatory in class components)                       |
| `componentDidMount()`                           | Runs after the component is added to the DOM (good for API calls) |

#### 🔹 Example:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello" };
  }

  componentDidMount() {
    console.log("Component mounted!");
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}
```

---

### ✅ **2. Updating Phase (Re-rendering)**

Runs when the **state or props change**.

| Method                                          | Description                                                     |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `static getDerivedStateFromProps(props, state)` | Updates state when props change                                 |
| `shouldComponentUpdate(nextProps, nextState)`   | Optimizes performance (returns `true` or `false`)               |
| `render()`                                      | Re-renders the UI                                               |
| `getSnapshotBeforeUpdate(prevProps, prevState)` | Captures info before changes are applied                        |
| `componentDidUpdate(prevProps, prevState)`      | Runs after state/props update (used for API calls, DOM updates) |

#### 🔹 Example:

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated!", this.state.count);
  }

  render() {
    return <h2>Count: {this.state.count}</h2>;
  }
}
```

---

### ✅ **3. Unmounting Phase (Component Removal)**

Runs when the component **is removed from the DOM**.

| Method                   | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `componentWillUnmount()` | Cleanup tasks (like removing event listeners, clearing timers) |

#### 🔹 Example:

```jsx
class MyComponent extends React.Component {
  componentWillUnmount() {
    console.log("Component will unmount!");
  }

  render() {
    return <h1>Goodbye!</h1>;
  }
}
```

---

## **🔹 3️⃣ Functional Components & Lifecycle (Using Hooks)**

In **modern React**, lifecycle methods are replaced with **Hooks** in functional components.

| Class Method           | Hook Alternative                           |
| ---------------------- | ------------------------------------------ |
| `componentDidMount`    | `useEffect(() => {}, [])`                  |
| `componentDidUpdate`   | `useEffect(() => {}, [state])`             |
| `componentWillUnmount` | `useEffect(() => { return () => {} }, [])` |

### ✅ **Example using `useEffect()` Hook**

```jsx
import React, { useState, useEffect } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted or updated!");
    return () => console.log("Component will unmount!"); // Cleanup function
  }, [count]);

  return <h2>Count: {count}</h2>;
};

export default MyComponent;
```

---

## **📌 Summary: Class vs. Functional Lifecycle Handling**

| Lifecycle Stage | Class Component          | Functional Component (Hooks)               |
| --------------- | ------------------------ | ------------------------------------------ |
| **Mounting**    | `componentDidMount()`    | `useEffect(() => {}, [])`                  |
| **Updating**    | `componentDidUpdate()`   | `useEffect(() => {}, [dependency])`        |
| **Unmounting**  | `componentWillUnmount()` | `useEffect(() => { return () => {} }, [])` |

---

## **🚀 Conclusion**

- **Use Class Components** if working with older codebases.
- **Use Functional Components with Hooks** for modern React development.
- **Hooks (`useEffect`) replace lifecycle methods in functional components**.

