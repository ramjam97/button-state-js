[![Hits](https://hits.sh/github.com/ramjam97/button-state-js.svg)](https://hits.sh/github.com/ramjam97/button-state-js/)

# ButtonStateJS

**Version:** 1.0.0  
**GitHub:** https://github.com/ramjam97/button-state-js     
**Author:** Ram Jam



A lightweight, dependency-free JavaScript utility for managing button UI states — **loading**, **disabled**, and **visibility** — with customizable classes, icons, and HTML templates.  
Designed for simplicity and flexibility in **vanilla JavaScript** applications.

---


## 🌟 Features

- 🎯 **Multi-target support** — Bind one or multiple buttons using selectors, DOM elements, or arrays.  
- ⚙️ **Smart state management** — Control `loading`, `disabled`, and `display` states with a clean API.  
- 🎨 **Fully customizable** — Set your own classes, icons, or HTML for each state.  
- 🔁 **Reactive updates** — Automatically re-render buttons when states change.  
- 🧠 **Callback hook** — Run a function on every state change with `onChange`.  
- 🧱 **Safe DOM handling** — Ignores removed elements automatically.  

---

## 📦 Installation

You can use **CDN** or include it manually.

### Via CDN
```html
<script src="https://cdn.jsdelivr.net/gh/ramjam97/button-state-js@v1.0.0/dist/index.min.js"></script>

```

---

## 🚀 Usage
```html
<button class="submit-btn">Submit</button>

<script>
  const btn = ButtonState('.submit-btn', {
    loading: { 
      class: 'is-loading',
      icon: '<span class="spinner"></span>'
    },
    onChange: (state, dom) => console.log('onChange:', state, dom)
  });

  // Set button to loading
  btn.loading(true);

  // Disable button manually
  btn.disabled(true);

  // Hide the button
  btn.hide();

  // Update multiple states at once
  btn.setState({ loading: false, display: true });
</script>
```

---

## ⚙️ Configuration
| Option Path            | Type                   | Default      | Description                                  |
| ---------------------- | ---------------------- | ------------ | -------------------------------------------- |
| `state.loading`        | `boolean`              | `false`      | Initial loading state.                       |
| `state.disabled`       | `boolean`              | `false`      | Initial disabled state.                      |
| `state.display`        | `boolean`              | `true`       | Initial visibility state.                    |
| `loading.class`        | `string`               | `'loading'`  | CSS class for loading state.                 |
| `loading.html`         | `string` or `function` | `null`       | Custom HTML or callback for loading display. |
| `loading.icon`         | `string`               | `''`         | Optional icon appended during loading.       |
| `disabled.class`       | `string`               | `'disabled'` | CSS class for disabled state.                |
| `display.show.class`   | `string`               | `'show'`     | CSS class when visible.                      |
| `display.hide.class`   | `string`               | `'hide'`     | CSS class when hidden.                       |
| `onChange(state, dom)` | `function`             | `null`       | Triggered after state updates.               |


---

## 🧠 API Reference
| Method           | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `setState(obj)`  | Updates one or more states (`loading`, `disabled`, `display`). |
| `loading(bool)`  | Enables or disables loading mode (also disables the button).   |
| `disabled(bool)` | Enables or disables the button.                                |
| `show(bool)`     | Shows the button(s).                                           |
| `hide(bool)`     | Hides the button(s).                                           |
| `refresh()`      | Manually re-renders the button(s).                             |

---

## 🧩 Return Object

```js
{
  dom,        // List of DOM elements
  target,     // Elements with default text/html/display
  state,      // Current internal state
  setState,   // Update multiple states
  refresh,    // Re-render manually
  loading,    // Toggle loading
  disabled,   // Toggle disabled
  show,       // Show elements
  hide        // Hide elements
}
```

---

## 🔍 Example with Multiple Buttons
```js
const buttons = ButtonState(['.save-btn', '.delete-btn'], {
  loading: { class: 'is-loading', icon: '⏳' },
  disabled: { class: 'is-disabled' },
  onChange: (state) => console.log('State:', state)
});

// Apply to both buttons
buttons.loading(true);

setTimeout(() => buttons.loading(false), 2000);
```


## 🧭 Example with Single Button Click
This example creates a **temporary ButtonState** instance when a button is clicked — useful for quick feedback during actions like form submissions or async tasks.
```html
<button id="btn2">Btn 2</button>

<script>
  document.getElementById('btn2').addEventListener('click', (e) => {
    const { loading } = ButtonState(e.target);
    loading(true);
    setTimeout(() => loading(false), 2000);
  });
</script>
```

> 💡 Perfect for buttons that need a short loading effect without global initialization.


## 📜 License
Licensed under the ISC License.   
Free for personal and commercial use with attribution.

---

## 👨‍💻 Author

**Ram Jam**   
📦 GitHub: [@ramjam97](https://github.com/ramjam97)