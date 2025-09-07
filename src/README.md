Button State JS

A lightweight vanilla JavaScript utility for managing button states (loading, disabled)
with built-in DOM updates, watchers, and cleanup support.

------------------------------------------------------------------------

📌 Project Info

-   GitHub: Button State JS
-   Version: 2.1.0
-   Author: Ram Jam

------------------------------------------------------------------------

🚀 Features

- Manage button states (loading, disabled).
- Auto-update DOM (innerHTML, disabled attribute, and classes).
- Watchers with cleanup support.
- Reset to initial state anytime.
- Safe error handling in watchers.

------------------------------------------------------------------------

📦 Installation

Include via CDN:

    <script src="https://cdn.jsdelivr.net/gh/ramjam97/button-state-js@v2.1.0/dist/button-state.min.js"></script>

------------------------------------------------------------------------

⚡ Usage Example

    const btnState = useBtnState('#myButton', {
      loadingText: 'Loading...', // optional
      loadingHtml: 'Loading...', // optional
      loadingIcon: '<span class="spinner"></span>', // optional
      state: { isDisabled: false, isLoading: false }, // optional
      classes: { disabled: 'disabled', loading: 'loading' } // optional
    });

    // Set loading state
    btnState.loading(true);

    // Disable button
    btnState.disabled(true);

    // Reset to initial state
    btnState.reset();

    // Watch every state update
    const stopAlways = btnState.watch((state) => {
      
      console.log('State updated:', state);

      // return cleanup function (called before next run)
      return () => console.log('Cleanup before next update');

    }, true);

    // Watch only when state changes
    const stopChange = btnState.watchEffects((state) => {
      console.log('State changed:', state);
    });

    // Unsubscribe watchers manually
    stopAlways();
    stopChange();
------------------------------------------------------------------------

🔑 API Reference

Initialization

    const btnState = useBtnState(selector, options);

-   selector (string, required): CSS selector for target button(s) or HTMLElement.
-   options (object, optional):
    -   loadingText (string): Custom loading text.
    -   loadingHtml (string): Custom loading text/HTML.
    -   loadingIcon (string): Icon or HTML element appended to loading text.
    -   state (object): Initial state { isDisabled: false, isLoading: false }.
    -   classes (object): Custom classes for disabled and loading { disabled: 'custom-class-name', loading: 'custom-class-name' }.

------------------------------------------------------------------------

State Methods

-   getState() → returns { initial, current } states.
-   setState(partial) → updates state with given partial object.

------------------------------------------------------------------------

Actions

-   loading(flag: boolean) → sets both isLoading and isDisabled.
-   disabled(flag: boolean) → enables/disables button(s).
-   reset() → resets to initial state.

------------------------------------------------------------------------

Watchers (with cleanup)

- watch(callback, executeOnInit = false)
  → runs on every state update.
  → callback receives state and may return a cleanup function.
  → returns an unsubscribe function.

- watchEffects(callback, executeOnInit = false)
  → runs only when state changes.
  → same cleanup and unsubscribe behavior as watch.

Example:

    const stop = btnState.watch((state) => {
      console.log('Watching...', state);
      return () => console.log('Cleanup before re-run');
    });

    stop(); // stops watching

------------------------------------------------------------------------

⚠️ Notes

- Invalid selector shows a console warning.
- partial in setState must be an object.
- Cleanup functions run before each callback re-run and on unsubscribe.

------------------------------------------------------------------------

## 📜 License

MIT License