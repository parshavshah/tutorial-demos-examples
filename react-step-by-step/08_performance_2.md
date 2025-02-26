# **🔹 `useMemo` & `useCallback` in React (Performance Optimization) 🚀**

When React components **re-render**, expensive calculations or functions can slow down performance.  
✅ **Solution?** Use `useMemo` and `useCallback` to optimize re-renders and avoid unnecessary computations.

---

## **🔹 1. What is `useMemo`?**

`useMemo` **memoizes** the result of a **computed value** and only recalculates it when dependencies change.

### **🔹 Syntax**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

✅ **Prevents unnecessary recalculations when re-rendering.**  
✅ **Useful for expensive calculations, filtering, or sorting.**

---

### **🔹 Example: Without `useMemo` (Unoptimized)**

Every time `count` updates, `expensiveCalculation` runs **unnecessarily**, slowing performance.

```jsx
import { useState } from "react";

const expensiveCalculation = (num) => {
  console.log("Running expensive calculation...");
  for (let i = 0; i < 1000000000; i++) {} // Simulating heavy computation
  return num * 2;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(5);

  const computedValue = expensiveCalculation(value); // Runs on every render 😬

  return (
    <div>
      <h2>Computed Value: {computedValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
};

export default App;
```

### 🔴 **Problem:**

🔹 Even if we only update `count`, the expensive calculation **re-runs every render**.  
🔹 **Performance decreases for large computations.**

---

### **✅ Solution: Using `useMemo` to Optimize**

```jsx
import { useState, useMemo } from "react";

const expensiveCalculation = (num) => {
  console.log("Running expensive calculation...");
  for (let i = 0; i < 1000000000; i++) {} // Simulating heavy computation
  return num * 2;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(5);

  const computedValue = useMemo(() => expensiveCalculation(value), [value]); // Memoized calculation 🚀

  return (
    <div>
      <h2>Computed Value: {computedValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
    </div>
  );
};

export default App;
```

### ✅ **Now:**

🔹 `computedValue` **only recalculates when `value` changes**.  
🔹 Clicking the button **does NOT trigger unnecessary recalculations**.  
🔹 **Performance improves significantly** for expensive functions.

---

## **🔹 2. What is `useCallback`?**

`useCallback` **memoizes** a function, preventing it from being **re-created on every render**.

### **🔹 Syntax**

```jsx
const memoizedFunction = useCallback(() => {
  // Function logic
}, [dependencies]);
```

✅ **Useful for preventing unnecessary re-renders in child components.**  
✅ **When a function is passed as a prop, `useCallback` keeps it from changing unnecessarily.**

---

### **🔹 Example: Without `useCallback` (Unoptimized)**

The `handleClick` function **re-creates on every render**, causing `ChildComponent` to **re-render unnecessarily**.

```jsx
import { useState } from "react";

const ChildComponent = ({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click me</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Button clicked");
  }; // New function created on every render 😬

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

export default ParentComponent;
```

### 🔴 **Problem:**

🔹 Even though `handleClick` **doesn't change**, it is **re-created** on every render.  
🔹 **Causes `ChildComponent` to re-render unnecessarily**.

---

### **✅ Solution: Using `useCallback` to Optimize**

```jsx
import { useState, useCallback } from "react";

const ChildComponent = ({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click me</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Memoized function 🚀

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

export default ParentComponent;
```

### ✅ **Now:**

🔹 `handleClick` **remains the same function across renders**.  
🔹 `ChildComponent` **only re-renders when needed**, improving performance.

---

## **🔹 3. `useMemo` vs. `useCallback` - Key Differences**

| Feature      | `useMemo` 🧠                     | `useCallback` 🔄                          |
| ------------ | -------------------------------- | ----------------------------------------- |
| **Purpose**  | Memoizes a **computed value**    | Memoizes a **function**                   |
| **Usage**    | Avoids expensive recalculations  | Prevents unnecessary function re-creation |
| **Returns**  | A **memoized value**             | A **memoized function**                   |
| **Best for** | Filtering, sorting, computations | Optimizing re-renders in child components |

---

## **🔹 4. When Should You Use `useMemo` & `useCallback`?**

✅ **Use `useMemo` when:**

- You have **expensive computations** that shouldn't re-run unnecessarily.
- You need to **optimize filtering, sorting, or transformations**.

✅ **Use `useCallback` when:**

- You're passing **functions as props** to child components.
- You want to **prevent unnecessary re-renders** due to function re-creation.

🚀 **Best practice:** Use them **only when necessary**—overusing them can **add complexity without real benefits**.

---

## **🔹 5. Example: `useMemo` & `useCallback` Together**

Here’s an example where we **filter a list** using `useMemo` and handle an event with `useCallback`.

```jsx
import { useState, useMemo, useCallback } from "react";

const List = ({ items, onClick }) => {
  console.log("List rendered");
  return items.map((item) => (
    <button key={item} onClick={() => onClick(item)}>
      {item}
    </button>
  ));
};

const App = () => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const items = ["Apple", "Banana", "Cherry", "Date", "Grape"];

  // Memoized filtered list
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Memoized event handler
  const handleClick = useCallback((item) => {
    console.log(`Clicked on ${item}`);
  }, []);

  return (
    <div>
      <input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      <List items={filteredItems} onClick={handleClick} />
    </div>
  );
};

export default App;
```

✅ **`useMemo` avoids filtering the list on every render.**  
✅ **`useCallback` ensures the function reference remains stable.**

---

## **🔹 Conclusion**

✅ **Use `useMemo` for expensive computations.**  
✅ **Use `useCallback` for memoizing functions.**  
✅ **Both improve performance but should be used wisely.**

