# **🔹 Using Redux with Functional Components in React**

React **functional components** rely on **hooks** (`useState`, `useEffect`, etc.). When using Redux, we integrate state management with two key hooks:  
✅ `useSelector()` → Access Redux state.  
✅ `useDispatch()` → Dispatch actions.

Let’s walk through how to set up and use **Redux in functional components** step by step.

---

## **🔹 Step 1: Install Redux & React-Redux**

Before using Redux in a React app, install the necessary dependencies:

```sh
npm install redux react-redux
```

---

## **🔹 Step 2: Create Redux Store**

A **store** holds the entire application state.

### **1️⃣ Create the Reducer**

A **reducer** is a function that takes the **current state** and an **action** and returns the new state.

```js
// counterReducer.js
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;
```

---

### **2️⃣ Create the Store & Provide it to React**

We use `createStore()` from Redux and wrap our app inside the `<Provider>` component to make the store available to all components.

```js
// store.js
import { createStore } from "redux";
import counterReducer from "./counterReducer";

const store = createStore(counterReducer);

export default store;
```

```js
// index.js (entry point)
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

> **📝 Why `<Provider>`?**  
> It makes the Redux store available to all child components **without passing props manually**.

---

## **🔹 Step 3: Using Redux in Functional Components**

In **class components**, we used `connect()`. In **functional components**, we use hooks:

- **`useSelector()`** → Reads state from the Redux store.
- **`useDispatch()`** → Dispatches actions to update the state.

### **1️⃣ Create Action Creators**

Action creators return action objects that describe **what should happen** in the app.

```js
// actions.js
export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
```

---

### **2️⃣ Create a Functional Component with Redux Hooks**

Now, we build a **counter component** that connects to Redux.

```js
// Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

const Counter = () => {
  const count = useSelector((state) => state.count); // Get count from Redux store
  const dispatch = useDispatch(); // Get dispatch function

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

> **📝 What’s Happening?**
>
> - `useSelector(state => state.count)` → Reads `count` from the store.
> - `useDispatch()` → Returns the `dispatch` function to trigger actions.
> - Clicking `+` or `-` **dispatches actions** that update Redux state.

---

## **🔹 Step 4: Connecting the Component to the App**

Finally, add the `Counter` component to the main `App.js` file.

```js
// App.js
import React from "react";
import Counter from "./Counter";

const App = () => {
  return (
    <div>
      <h1>Redux Counter</h1>
      <Counter />
    </div>
  );
};

export default App;
```

---

## **🔹 Summary: Redux in Functional Components**

| **Feature**      | **Class Components** | **Functional Components**        |
| ---------------- | -------------------- | -------------------------------- |
| Connect to Redux | `connect()` HOC      | `useSelector()`, `useDispatch()` |
| Access State     | `mapStateToProps`    | `useSelector()`                  |
| Dispatch Actions | `mapDispatchToProps` | `useDispatch()`                  |
| Complexity       | More boilerplate     | Simpler & cleaner                |

---

## **🔹 When to Use Redux with Functional Components?**

✅ If multiple components need to **share state**.  
✅ When **prop drilling** becomes difficult.  
✅ If state needs to be **persisted globally**.  
✅ If you want a **predictable state** with strict rules.
