# ✅ **`useMemo` & `useCallback` – Performance Optimization in React**

React re-renders components when their **state** or **props** change. However, frequent re-renders can lead to **performance issues**, especially in large applications.

👉 **`useMemo` and `useCallback` optimize performance** by **memoizing** values and functions, preventing unnecessary re-computations.

---

## 🔹 **1️⃣ `useMemo` Hook (Memoizing Computed Values)**

`useMemo` **caches the result** of a function and **recomputes it only if dependencies change**.

### ✅ **Syntax**

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(dep1, dep2),
  [dep1, dep2]
);
```

✔️ **Runs the function only when `dep1` or `dep2` change**.  
✔️ **Avoids unnecessary recalculations** during re-renders.

---

### ✅ **Example: Expensive Calculation Without `useMemo`**

```jsx
import React, { useState } from "react";

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);

  // Expensive computation runs on every render
  const expensiveCalculation = () => {
    console.log("Calculating...");
    return value ** 2; // Just an example of an expensive operation
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Computed Value: {expensiveCalculation()}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};

export default ExpensiveComponent;
```

🔴 **Problem:** Every time `count` updates, `expensiveCalculation()` **re-runs unnecessarily**.

---

### ✅ **Optimized Example: Using `useMemo`**

```jsx
import React, { useState, useMemo } from "react";

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(10);

  // Memoized value: Only recalculates if `value` changes
  const memoizedCalculation = useMemo(() => {
    console.log("Calculating...");
    return value ** 2;
  }, [value]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Computed Value: {memoizedCalculation}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};

export default ExpensiveComponent;
```

✔️ **`useMemo` prevents unnecessary recomputation**, improving performance.  
✔️ **Now, changing `count` doesn’t trigger recalculation.**

---

## 🔹 **2️⃣ `useCallback` Hook (Memoizing Functions)**

`useCallback` **caches a function**, ensuring it’s not re-created on every render unless dependencies change.

### ✅ **Syntax**

```jsx
const memoizedFunction = useCallback(() => {
  // Function logic
}, [dependencies]);
```

✔️ **Prevents unnecessary function re-creation** on every render.  
✔️ **Useful when passing functions as props** to child components.

---

### ✅ **Example: Without `useCallback` (Function Gets Recreated on Every Render)**

```jsx
import React, { useState } from "react";
import ChildComponent from "./ChildComponent";

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default Parent;
```

🔴 **Problem:** `handleClick` is **recreated** on every render, causing unnecessary updates in `ChildComponent`.

---

### ✅ **Optimized Example: Using `useCallback`**

```jsx
import React, { useState, useCallback } from "react";
import ChildComponent from "./ChildComponent";

const Parent = () => {
  const [count, setCount] = useState(0);

  // Memoized function: Only re-created if `count` changes
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default Parent;
```

✔️ **Now, `handleClick` remains the same across renders**, preventing unnecessary updates in `ChildComponent`.

---

## 🔹 **3️⃣ `useMemo` vs. `useCallback`**

| Hook              | Purpose                     | Use Case                                 |
| ----------------- | --------------------------- | ---------------------------------------- |
| **`useMemo`**     | Caches a computed value     | Avoids expensive recalculations          |
| **`useCallback`** | Caches a function reference | Prevents unnecessary function recreation |

### ✅ **Key Difference:**

- **`useMemo` returns a **value**.**
- **`useCallback` returns a **memoized function**.**

---

## 📌 **When to Use `useMemo` and `useCallback`?**

✔️ Use **`useMemo`** for **expensive calculations** that shouldn’t re-run on every render.  
✔️ Use **`useCallback`** when **passing functions to child components** to prevent unnecessary re-renders.

