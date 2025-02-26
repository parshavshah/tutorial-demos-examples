# **🔹 Redux Toolkit (Modern Approach) in React** 🚀

Redux **Toolkit (RTK)** is the **official, recommended way** to use Redux in modern React apps. It **reduces boilerplate**, simplifies state management, and makes Redux **more efficient**.

✅ **Why use Redux Toolkit?**  
✔ Less boilerplate (fewer files, less code)  
✔ Built-in **Thunk middleware** for async logic  
✔ Uses **Immer.js** for easy immutable state updates  
✔ Includes `createSlice()` to simplify actions & reducers

Let’s walk through how to use Redux Toolkit **step by step**.

---

## **🔹 Step 1: Install Redux Toolkit**

First, install Redux Toolkit (`@reduxjs/toolkit`) and React Redux (`react-redux`).

```sh
npm install @reduxjs/toolkit react-redux
```

---

## **🔹 Step 2: Create the Redux Store**

Instead of using `createStore()`, **RTK uses `configureStore()`**, which:  
✅ Automatically sets up **Redux DevTools**  
✅ Includes **Thunk middleware** by default

### **Store Setup**

```js
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import slice reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add reducers here
  },
});

export default store;
```

> **📝 No need for `combineReducers()` – RTK handles it automatically!**

---

## **🔹 Step 3: Create a Slice (Reducers + Actions in One File)**

RTK introduces **slices**, which **combine actions and reducers** in a single file using `createSlice()`.

### **Counter Slice**

```js
// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 }, // Initial state
  reducers: {
    increment: (state) => {
      state.count += 1; // Directly modify state (Immer handles immutability)
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload; // Custom increment
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

> **📝 `createSlice()` does three things:**
>
> 1. Creates a **reducer** (`counterReducer`).
> 2. Generates **action creators** (`increment`, `decrement`).
> 3. Uses **Immer.js** to allow **direct state mutations**.

---

## **🔹 Step 4: Provide Store to React**

Wrap your `App.js` inside `<Provider>` to connect Redux to React.

```js
// index.js (Entry Point)
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
> It makes Redux **available to all components** in the app.

---

## **🔹 Step 5: Use Redux in Functional Components**

We can now use **Redux state and actions** inside components using `useSelector()` and `useDispatch()`.

### **Counter Component**

```js
// Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count); // Access state
  const dispatch = useDispatch(); // Get dispatch function

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
};

export default Counter;
```

> **📝 How Redux Hooks Work:**
>
> - `useSelector(state => state.counter.count)` → Reads Redux state.
> - `useDispatch()` → Dispatches actions (`increment`, `decrement`).

---

## **🔹 Step 6: Using Redux Async with RTK (Thunk)**

Redux Toolkit **includes Thunk by default** for handling async actions like API calls.

### **Create an Async Action**

```js
// counterSlice.js (Add Async Thunk)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async function to fetch a random number
export const fetchRandomNumber = createAsyncThunk(
  "counter/fetchRandomNumber",
  async () => {
    const response = await fetch(
      "https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100"
    );
    const data = await response.json();
    return data[0]; // Return the number
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0, loading: false },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomNumber.fulfilled, (state, action) => {
        state.count = action.payload; // Update state with API response
        state.loading = false;
      })
      .addCase(fetchRandomNumber.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

---

### **Call Async Action in Component**

```js
import { useSelector, useDispatch } from "react-redux";
import { fetchRandomNumber } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const loading = useSelector((state) => state.counter.loading);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(fetchRandomNumber())}>
        {loading ? "Loading..." : "Fetch Random Number"}
      </button>
    </div>
  );
};
```

> **📝 `createAsyncThunk()` Handles:**
>
> - `pending` (before API call).
> - `fulfilled` (when API succeeds).
> - `rejected` (if API fails).

---

## **🔹 Redux Toolkit vs. Traditional Redux**

| Feature             | Traditional Redux   | Redux Toolkit (RTK)                     |
| ------------------- | ------------------- | --------------------------------------- |
| **Boilerplate**     | More code           | Less code                               |
| **Action Creators** | Manual              | Auto-generated (`createSlice()`)        |
| **Reducers**        | Pure functions      | Uses **Immer.js** (mutate state safely) |
| **Async (Thunk)**   | Manual setup        | Built-in (`createAsyncThunk()`)         |
| **DevTools**        | Manually configured | Enabled by default                      |

---

## **🔹 When to Use Redux Toolkit?**

✅ If your app needs **global state** management.  
✅ If you want a **cleaner, modern Redux setup**.  
✅ If you need **async data fetching (Thunk) out of the box**.

---

## **🔹 Final Thoughts**

Redux Toolkit **simplifies Redux** while keeping its power. 🚀

- **No more manual reducers & actions**
- **Built-in async handling**
- **Automatic DevTools & performance optimizations**

Would you like a guide on **RTK Query (advanced async state management)?** 🔥
