# **🔹 React.memo: Avoiding Unnecessary Renders in React 🚀**

React **re-renders components** whenever state or props change. However, sometimes, a component **re-renders even when its props haven't changed**, which **hurts performance**.

### ✅ **Solution: `React.memo`**

`React.memo` **memoizes** a component, preventing unnecessary re-renders **if its props remain the same**.

---

## **🔹 1. What is `React.memo`?**

`React.memo` is a **higher-order component (HOC)** that **wraps a functional component** and **caches** the result, skipping re-rendering **unless props change**.

### **🔹 Basic Syntax**

```jsx
import React from "react";

const MyComponent = ({ name }) => {
  console.log("Rendering MyComponent");
  return <h2>Hello, {name}!</h2>;
};

export default React.memo(MyComponent);
```

Now, `MyComponent` **only re-renders if the `name` prop changes**.

---

## **🔹 2. Example Without `React.memo` (Unnecessary Re-Renders)**

### **Problem: Child Component Always Re-Renders**

```jsx
import { useState } from "react";

const ChildComponent = ({ name }) => {
  console.log("ChildComponent rendered");
  return <h2>Hello, {name}!</h2>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent name="John" />
    </div>
  );
};

export default ParentComponent;
```

### 🔴 **Issue:**

Every time the button is clicked:
✅ The `ParentComponent` **re-renders** (expected).  
🔴 **But `ChildComponent` also re-renders** (even though its `name` prop hasn’t changed).

---

## **🔹 3. Solution: Using `React.memo` to Optimize**

```jsx
import { useState } from "react";
import React from "react";

const ChildComponent = React.memo(({ name }) => {
  console.log("ChildComponent rendered");
  return <h2>Hello, {name}!</h2>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent name="John" />
    </div>
  );
};

export default ParentComponent;
```

### ✅ **Now:**

🔹 `ParentComponent` still re-renders when clicking the button.  
✅ **`ChildComponent` only re-renders when the `name` prop changes**.

---

## **🔹 4. When Should You Use `React.memo`?**

✅ **For components that receive the same props most of the time.**  
✅ **For components that render large lists or expensive calculations.**  
✅ **When unnecessary re-renders affect performance.**

### **🚫 When NOT to Use `React.memo`?**

🔴 If props change **frequently**, `React.memo` **adds overhead instead of improving performance**.  
🔴 If a component is **very simple**, memoization **won’t make a noticeable difference**.

---

## **🔹 5. `React.memo` with `useCallback` for Functions**

If a component receives a **callback function as a prop**, React **sees it as a new function on every render**. This still causes **unnecessary re-renders**.

### **🔴 Problem: New Function Reference Every Render**

```jsx
import { useState } from "react";

const Button = React.memo(({ onClick }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>Click me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1); // New function every render

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={increment} />
    </div>
  );
};

export default App;
```

✅ **`Button` is memoized, but still re-renders because `increment` is a new function every render!**

---

### **🔹 Solution: `useCallback` + `React.memo`**

```jsx
import { useState, useCallback } from "react";

const Button = React.memo(({ onClick }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>Click me</button>;
});

const App = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((prev) => prev + 1), []); // Memoized function

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={increment} />
    </div>
  );
};

export default App;
```

### ✅ **Now:**

🔹 `increment` **keeps the same reference**, so `Button` **doesn’t re-render unnecessarily**.

---

## **🔹 6. `React.memo` with Custom Comparison Function**

By default, `React.memo` does a **shallow comparison** of props. If props contain **objects or arrays**, re-renders may still happen.

### **🔴 Problem: Object Props Cause Re-Renders**

```jsx
const Child = React.memo(({ user }) => {
  console.log("Child rendered");
  return <p>{user.name}</p>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const user = { name: "Alice" }; // New object every render

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <Child user={user} />
    </div>
  );
};

export default App;
```

🔴 `user` is **a new object every render**, so `Child` **still re-renders!**

---

### **🔹 Solution: Custom Equality Function**

Use a **custom comparison function** to **deep compare** props.

```jsx
const areEqual = (prevProps, nextProps) => {
  return prevProps.user.name === nextProps.user.name;
};

const Child = React.memo(({ user }) => {
  console.log("Child rendered");
  return <p>{user.name}</p>;
}, areEqual);
```

✅ **Now, `Child` only re-renders when `user.name` changes.**

---

## **🔹 7. Summary & Best Practices**

✅ **Use `React.memo` for components that receive unchanged props.**  
✅ **Combine `React.memo` with `useCallback` for function props.**  
✅ **Use a custom equality function for deep prop comparisons.**  
✅ **Avoid `React.memo` for components that frequently update.**  
✅ **Measure performance before optimizing—don't overuse memoization.**

