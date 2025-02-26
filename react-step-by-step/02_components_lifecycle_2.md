## ✅ **useState Hook (State Management) in React**

### 🔹 **What is `useState`?**

`useState` is a **React Hook** that allows **functional components** to manage state. It enables components to store, update, and react to changes in data.

🔹 **Syntax:**

```jsx
const [state, setState] = useState(initialValue);
```

- **`state`** → Holds the current value.
- **`setState`** → Updates the state and triggers a re-render.
- **`initialValue`** → The starting value of the state.

---

## **🔹 Example 1: Basic Counter**

```jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0); // State variable

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default Counter;
```

✅ Here, clicking the button updates the state (`count`), causing the component to re-render.

---

## **🔹 Example 2: Managing Text Input**

```jsx
import React, { useState } from "react";

const InputField = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <p>You typed: {text}</p>
    </div>
  );
};

export default InputField;
```

✅ The input value updates dynamically as the user types.

---

## **🔹 Updating State with Previous State**

When updating state based on the previous value, use a **callback function**.

```jsx
setCount((prevCount) => prevCount + 1);
```

🔹 **Example: Counter with Previous State**

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount((prev) => prev + 1)}>Increase</button>;
```

✅ Ensures correct updates, especially in **asynchronous state updates**.

---

## **🔹 useState with Objects & Arrays**

### ✅ **Updating Object State**

```jsx
const [user, setUser] = useState({ name: "John", age: 25 });

const updateAge = () => {
  setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
};

<h2>{user.name} is {user.age} years old.</h2>
<button onClick={updateAge}>Increase Age</button>
```

✅ **Always use `...prevUser` to keep existing properties.**

---

### ✅ **Updating Array State**

```jsx
const [items, setItems] = useState([]);

const addItem = () => {
  setItems([...items, { id: items.length, value: Math.random() * 100 }]);
};

<button onClick={addItem}>Add Item</button>;
```

✅ **Spread operator (`...items`) ensures the array remains immutable.**

---

## **📌 Key Takeaways**

| Feature                   | `useState` in Action                          |
| ------------------------- | --------------------------------------------- |
| **Initial State**         | `useState(0)` or `useState("")`               |
| **State Update**          | `setState(newValue)`                          |
| **Previous State Update** | `setState(prev => prev + 1)`                  |
| **Object Update**         | `setState(prev => ({ ...prev, key: value }))` |
| **Array Update**          | `setState([...prev, newItem])`                |

🚀 **Conclusion:** `useState` is the go-to hook for state management in functional components. Want to explore more, like `useEffect` for side effects? 😊
