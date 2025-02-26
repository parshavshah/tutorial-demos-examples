# **🔹 Redux Middleware (Thunk & Saga) in React**

## **🔹 What is Redux Middleware?**

Redux **middleware** extends Redux's functionality by intercepting actions **before** they reach the reducer. It allows for:  
✅ **Asynchronous actions** (API calls, database updates).  
✅ **Side effects** (logging, analytics, caching).  
✅ **Conditional dispatching** (prevent certain actions from reaching reducers).

The two most common middleware solutions for handling **async operations** in Redux are:  
1️⃣ **Redux Thunk** – Simple async logic with Promises.  
2️⃣ **Redux Saga** – More powerful, uses Generators.

---

## **🔹 1. Redux Thunk – Simple Middleware for Async Logic**

Redux **Thunk** allows action creators to return a function instead of an action object. This function can **dispatch multiple actions** and handle **async tasks** like API calls.

### **🔹 How Redux Thunk Works**

- Normal Redux actions return **plain objects** → `{ type: "INCREMENT" }`
- Thunk actions return **functions** → `(dispatch) => { ... }`
- These functions can perform **side effects** like fetching data and dispatching multiple actions.

---

### **🔹 Implementing Redux Thunk in React**

### **1️⃣ Install Redux Thunk**

```sh
npm install redux-thunk
```

### **2️⃣ Apply Thunk Middleware to Redux Store**

```js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
```

---

### **3️⃣ Create an Async Action (Thunk)**

This action **fetches data from an API** and updates Redux state.

```js
// actions.js
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USERS_REQUEST" });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", error });
    }
  };
};
```

---

### **4️⃣ Create a Reducer to Handle API Response**

```js
const initialState = {
  loading: false,
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
```

---

### **5️⃣ Use the Async Action in a React Component**

```js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./actions";

const UserList = () => {
  const { users, loading, error } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // Call the async action
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

> **📝 Summary of Thunk:**
>
> - **Pros:** Easy to implement, minimal setup.
> - **Cons:** Can lead to **messy action creators** with complex logic inside.

---

## **🔹 2. Redux Saga – More Powerful Async Middleware**

Redux **Saga** is an alternative to Thunk that uses **ES6 Generators** (`function*`) to handle async operations.

- **More powerful than Thunk** (handles long-running tasks, cancellation, and side effects).
- **Better for complex async logic** (e.g., chaining multiple API calls).

---

### **🔹 Implementing Redux Saga in React**

### **1️⃣ Install Redux Saga**

```sh
npm install redux-saga
```

### **2️⃣ Apply Saga Middleware to Redux Store**

```js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas"; // Import sagas

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga); // Run Sagas

export default store;
```

---

### **3️⃣ Create an Async Saga**

Sagas **listen for actions** and run side effects like API calls.

```js
import { call, put, takeEvery } from "redux-saga/effects";

// Simulated API call
const fetchUsersAPI = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

// Worker Saga: Fetches users
function* fetchUsersSaga() {
  try {
    const users = yield call(fetchUsersAPI);
    yield put({ type: "FETCH_USERS_SUCCESS", payload: users });
  } catch (error) {
    yield put({ type: "FETCH_USERS_FAILURE", error });
  }
}

// Watcher Saga: Listens for FETCH_USERS_REQUEST action
export function* watchFetchUsers() {
  yield takeEvery("FETCH_USERS_REQUEST", fetchUsersSaga);
}

// Root Saga
export default function* rootSaga() {
  yield watchFetchUsers();
}
```

---

### **4️⃣ Dispatching Actions from a React Component**

```js
import { useDispatch } from "react-redux";

const dispatch = useDispatch();
dispatch({ type: "FETCH_USERS_REQUEST" }); // Triggers the Saga
```

> **📝 Summary of Saga:**
>
> - **Pros:** Handles complex async flows (chaining, cancellation, debouncing).
> - **Cons:** More boilerplate and steeper learning curve than Thunk.

---

## **🔹 Redux Thunk vs Redux Saga – When to Use What?**

| Feature                                     | Redux Thunk        | Redux Saga          |
| ------------------------------------------- | ------------------ | ------------------- |
| **Best for**                                | Simple async logic | Complex async logic |
| **API Calls**                               | ✅ Yes             | ✅ Yes              |
| **Chaining Requests**                       | 🚫 Difficult       | ✅ Easy             |
| **Action Cancellation**                     | 🚫 No              | ✅ Yes              |
| **Side Effects (e.g., Logging, Analytics)** | 🚫 No              | ✅ Yes              |
| **Learning Curve**                          | ✅ Easy            | ❌ Harder           |
| **Boilerplate Code**                        | ✅ Minimal         | ❌ More Code        |

---

## **🔹 Which One Should You Use?**

✅ **Use Redux Thunk If…**  
✔ Your app needs basic async logic (e.g., fetching data from an API).  
✔ You want an easy-to-use solution with minimal setup.

✅ **Use Redux Saga If…**  
✔ Your app has **complex async workflows** (e.g., retries, background sync, cancellations).  
✔ You need **better control over async operations** (parallel execution, long-running tasks).

---

## **🔹 Final Thoughts**

- **Redux Thunk** is great for **simple** use cases.
- **Redux Saga** is better for **complex async logic**.
- If starting fresh, consider using **Redux Toolkit (RTK Query)**, which simplifies async state management.

