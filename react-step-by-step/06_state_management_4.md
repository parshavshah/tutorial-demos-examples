# **🔹 Redux Core Concepts (Store, Actions, Reducers) in React**

Redux is a **state management library** that helps manage and share state across components in a React application. It follows a **unidirectional data flow** and has three main building blocks:

✅ **Store** → Holds the global state.  
✅ **Actions** → Describe what should change in the state.  
✅ **Reducers** → Update the state based on actions.

Let's break each concept down with examples.

---

## **1️⃣ Store – The Global State Container**

The **store** is a JavaScript object that holds the entire application's state in a single place.

- Components access state from the store instead of managing it locally.
- We use `createStore()` (or `configureStore()` in Redux Toolkit) to create the store.

### **Example of a Redux Store:**

```js
import { createStore } from "redux";
import counterReducer from "./counterReducer"; // Reducer to manage state

// Create the Redux store
const store = createStore(counterReducer);

export default store;
```

> **Key Points:**
>
> - A **single store** manages the entire application state.
> - Components can **subscribe** to the store and get updated when state changes.

---

## **2️⃣ Actions – Describe What Should Change**

Actions are **plain JavaScript objects** that tell Redux **what should happen** in the app.

- Every action must have a `type` property (string) that describes the action.
- Actions can also have a **payload** (optional) to pass extra data.

### **Example of Actions:**

```js
// actionTypes.js (optional: to avoid typos in action types)
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

// actions.js
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});
```

> **Key Points:**
>
> - Actions **don’t modify state directly**—they just describe what should change.
> - The **reducer** will handle the logic to update the state.

---

## **3️⃣ Reducers – Handle State Updates**

Reducers are **pure functions** that take the **current state** and an **action**, then return a **new state**.

- Reducers must be **pure** (no side effects, API calls, or modifying existing state).
- They use a `switch` statement to handle different action types.

### **Example of a Reducer:**

```js
import { INCREMENT, DECREMENT } from "./actionTypes";

const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state; // Always return the current state if action is unknown
  }
};

export default counterReducer;
```

> **Key Points:**
>
> - Reducers **never mutate** the state directly (use `...state` to copy it).
> - Must return a **new state** instead of modifying the existing state.

---

## **🔹 Connecting Redux to a React App**

Now, let's see how we **connect Redux** with a React component.

### **1️⃣ Provide the Store to React Components**

We wrap the app inside a `<Provider>` to make Redux available to all components.

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store"; // Import Redux store
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

---

### **2️⃣ Access Redux State & Dispatch Actions in Components**

React components interact with Redux using two hooks:

- **`useSelector()`** → To read data from the store.
- **`useDispatch()`** → To send actions to the store.

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

const Counter = () => {
  const count = useSelector((state) => state.count); // Get state from store
  const dispatch = useDispatch(); // Get function to dispatch actions

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Counter;
```

---

## **🔹 Summary**

| Concept         | What it Does                       | Example                                           |
| --------------- | ---------------------------------- | ------------------------------------------------- |
| **Store**       | Holds the entire application state | `const store = createStore(reducer)`              |
| **Actions**     | Describe what should happen        | `{ type: "INCREMENT" }`                           |
| **Reducers**    | Update state based on actions      | `(state, action) => newState`                     |
| **useSelector** | Read state from the store          | `const count = useSelector(state => state.count)` |
| **useDispatch** | Dispatch actions                   | `dispatch(increment())`                           |

---

## **🔹 Next Steps**

This is the basic Redux setup! If you're building a **larger app**, consider using **Redux Toolkit (RTK)** for less boilerplate and better performance.

