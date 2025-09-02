/*
github: https://github.com/ramjam97/button-state-js/blob/master/versions/1.1.0/button-state.min.js
version: 1.1.0
author: Ram Jam
*/

function useBtnState(btnSelector = null, options = {}) {

    const isValid = typeof btnSelector === "string" && btnSelector.trim().length > 0;
    if (!isValid) {
        console.warn("Please provide a valid button selector.");
    }

    // prepare button references
    const targetBtnList = (isValid ? Array.from(document.querySelectorAll(btnSelector)) : []).map((btn) => {

        const defaultInnerHTML = btn.innerHTML;

        let loadingInnerHTML = defaultInnerHTML;
        loadingInnerHTML = options.loadingText ?? loadingInnerHTML;
        loadingInnerHTML = options.loadingHtml ?? loadingInnerHTML;
        loadingInnerHTML += options.loadingIcon ?? "";

        return {
            element: btn,
            defaultInnerHTML,
            loadingInnerHTML
        };
    });

    // initial state
    const initialState = Object.freeze({
        isDisabled: Boolean(options?.state?.isDisabled || false),
        isLoading: Boolean(options?.state?.isLoading || false)
    });


    // state
    let state = { ...initialState };

    // listeners
    const watchers = {
        always: [],
        onChange: []
    };

    // --- state management ---
    function setState(partial = {}) {

        if (targetBtnList.length === 0) return;

        if (typeof partial !== "object") {
            console.warn("Partial state must be an object.");
            return;
        }

        const prev = { ...state };
        const next = { ...state, ...partial };

        const hasChange = prev.isDisabled !== next.isDisabled || prev.isLoading !== next.isLoading;

        state = next;
        renderUpdate();
        notify("always");

        if (hasChange) notify("onChange");
    }

    // --- actions ---
    const loading = (flag = true) => setState({ isLoading: flag, isDisabled: flag });
    const disabled = (flag = true) => setState({ isDisabled: flag });
    const reset = () => setState({ ...initialState });

    // --- dom updates ---
    function renderUpdate() {
        if (targetBtnList.length === 0) {
            console.warn(`'${btnSelector}' not found. Please check your selector.`);
        }
        targetBtnList.forEach(({ element, defaultInnerHTML, loadingInnerHTML }) => {
            const html = state.isLoading ? loadingInnerHTML : defaultInnerHTML;
            if (element.innerHTML !== html) element.innerHTML = html;
            if (element.disabled !== state.isDisabled) element.disabled = state.isDisabled;
        });
    }

    // --- watchers ---
    function addWatcher(type, callback, executeOnInit) {
        if (typeof callback !== "function") {
            console.warn("Callback must be a function.");
            return;
        }
        watchers[type].push(callback);
        if (executeOnInit) callback(getState().current);
    }

    const watch = (callback, executeOnInit = false) => addWatcher("always", callback, executeOnInit);
    const watchEffects = (callback, executeOnInit = false) => addWatcher("onChange", callback, executeOnInit);

    const notify = (type) => {
        const snapshot = Object.freeze({ ...state });
        watchers[type].forEach((cb) => cb(snapshot));
    };

    // --- utilities ---
    const getState = () => ({
        initial: { ...initialState },
        current: { ...state }
    });

    const getTarget = () => targetBtnList;

    renderUpdate();

    return {
        // target dom elements
        getTarget,

        // state actions
        getState,
        setState,

        // actions
        loading,
        disabled,
        reset,

        // watchers
        watch,
        watchEffects,
    };
}
