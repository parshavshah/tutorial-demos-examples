# **🔹 React Fiber & Reconciliation – Interview Guide & Best Practices 🚀**

## **📌 What is React Fiber?**

React **Fiber** is the **reimplementation of React’s core reconciliation algorithm**, introduced in React 16.

✅ It improves **rendering performance** and allows React to handle UI updates more efficiently.  
✅ Enables **asynchronous rendering**, making React faster and smoother.  
✅ Supports features like **concurrent rendering, Suspense, and time slicing**.

### **⚡ Why was Fiber Introduced?**

Before Fiber, React used a **stack-based reconciliation algorithm**, which **blocked the UI** during updates. Fiber solved this by:

- **Splitting rendering work into small chunks** (units of work).
- **Pausing & resuming rendering** when needed.
- **Prioritizing updates** (e.g., user interactions over background tasks).

---

## **📌 What is Reconciliation in React?**

Reconciliation is the process React uses to **update the UI efficiently** when the state or props change.

👉 **Steps of Reconciliation:**  
1️⃣ React **compares the Virtual DOM** with the previous one.  
2️⃣ Identifies the **differences (diffing algorithm)**.  
3️⃣ Updates **only the changed parts in the actual DOM** (efficient rendering).

✅ **Key Benefits of Reconciliation:**

- **Minimizes unnecessary re-renders.**
- **Optimizes performance with a "diffing" algorithm.**
- **Uses "Keys" for efficient list updates.**

---

## **📌 How Does React Fiber Work?**

React Fiber breaks rendering into **small units of work** called **fibers**.

🔹 Each fiber represents a **node in the Virtual DOM**.  
🔹 Fiber works **in steps** rather than blocking the main thread.

### **⚡ Fiber's Two Phases:**

1️⃣ **Render Phase (Work Preparation)** – React calculates changes but doesn’t update the UI yet.  
2️⃣ **Commit Phase (UI Update)** – React applies the updates to the DOM.

✅ **Render Phase is Interruptible** (can pause and resume updates).  
❌ **Commit Phase is NOT interruptible** (DOM updates happen instantly).

---

## **📌 Best Practices for Fiber & Reconciliation**

✅ **Use "Keys" in Lists** to help React identify changes efficiently:

```jsx
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}
```

❌ Avoid using **index as a key** unless items are static.

✅ **Use `React.memo()`** to avoid unnecessary re-renders:

```jsx
const MemoizedComponent = React.memo(MyComponent);
```

✅ **Use `useCallback` and `useMemo`** to optimize function and value references:

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(), [dependency]);
const memoizedFunction = useCallback(() => doSomething(), [dependency]);
```

✅ **Break Large Components into Smaller Ones** to let Fiber prioritize rendering efficiently.

✅ **Use Concurrent Features like Suspense & React.lazy** for better performance.

---

## **📌 Interview Questions on React Fiber & Reconciliation**

### **🔹 Basic Questions**

1️⃣ What is React Fiber, and why was it introduced?  
2️⃣ How does reconciliation work in React?  
3️⃣ What is the difference between Fiber and the old reconciliation algorithm?

### **🔹 Advanced Questions**

4️⃣ How does React Fiber handle asynchronous rendering?  
5️⃣ Explain the two phases of React Fiber (Render & Commit).  
6️⃣ What happens when you update the state in React?  
7️⃣ How does React optimize reconciliation for lists?  
8️⃣ Why should we use keys in React lists?

---

### **🚀 Final Thoughts**

React Fiber makes rendering more **efficient, faster, and smoother**.  
Understanding **how reconciliation works** and **how Fiber optimizes UI updates** can help you write **high-performance React applications**.
