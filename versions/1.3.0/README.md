Button State JS

A lightweight utility for managing button states in vanilla JavaScript.

------------------------------------------------------------------------

📌 Project Info

-   GitHub: button-state-js
-   Version: 1.3.0
-   Author: Ram Jam

------------------------------------------------------------------------

🚀 Features

-   Manage button states (loading, disabled) with ease.
-   Auto-update DOM (innerHTML and disabled state).
-   Watchers to track state updates and changes.
-   Simple reset functionality.

------------------------------------------------------------------------

📦 Installation

Just include the script in your project or import the function directly.

    <script src="https://cdn.jsdelivr.net/gh/ramjam97/button-state-js@master/versions/1.3.0/button-state.min.js"></script>

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

    // Watch state (always called)
    btnState.watch((state) => {
      console.log('State updated:', state);
    }, true);

    // Watch only when state changes
    btnState.watchEffects((state) => {
      console.log('State changed:', state);
    });

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

Watchers

-   watch(callback, executeOnInit = false) → runs callback on every state set.
-   watchEffects(callback, executeOnInit = false) → runs callback only on state
    changes.

------------------------------------------------------------------------

⚠️ Notes

-   If selector is invalid, a warning will be shown in the console.
-   partial passed to setState must be an object.

------------------------------------------------------------------------

📄 Author

© Ram Jam
