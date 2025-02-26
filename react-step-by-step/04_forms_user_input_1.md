# ✅ **Controlled Components in React (Forms & Handling User Input)**

## 🔹 **What Are Controlled Components?**

A **Controlled Component** in React is a form element (**input, textarea, select**) that is **controlled by React state**.

### ✅ **How It Works?**

✔️ **State holds the input value** (instead of the DOM).  
✔️ **The value is updated via `onChange`** handler.  
✔️ **React fully controls the form data**, making it predictable.

---

## 🔹 **Example: Controlled Input Field**

```jsx
import React, { useState } from "react";

const ControlledInput = () => {
  const [name, setName] = useState(""); // State to store input value

  return (
    <div>
      <input
        type="text"
        value={name} // Controlled by state
        onChange={(e) => setName(e.target.value)} // Updates state
        placeholder="Enter your name"
      />
      <p>Your Name: {name}</p>
    </div>
  );
};

export default ControlledInput;
```

✔️ **The input value is stored in state (`name`).**  
✔️ **`onChange` updates the state when user types.**  
✔️ **No direct manipulation of the DOM** (unlike Vanilla JavaScript).

---

## 🔹 **Example: Controlled Form (Multiple Inputs)**

```jsx
import React, { useState } from "react";

const ControlledForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread previous state
      [e.target.name]: e.target.value, // Update dynamically
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
```

✔️ **Handles multiple inputs using a single `handleChange`.**  
✔️ **State (`formData`) manages form values dynamically.**  
✔️ **Prevents form submission from refreshing the page (`e.preventDefault()`).**

---

## 🔹 **Benefits of Controlled Components**

✅ **Single source of truth** (state manages form data).  
✅ **Easy validation** (check values before submitting).  
✅ **Predictable behavior** (no direct DOM manipulation).  
✅ **Enables React hooks** (`useState`, `useEffect`).

