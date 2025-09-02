/*
github: https://github.com/ramjam97/button-state-js/blob/master/versions/1.2.0/button-state.min.js
version: 1.2.0
author: Ram Jam
*/

function useBtnState(btnSelector = null, options = {}) {

    // prepare button references
    const targetBtnList = [...getButtonElements()].map((btn) => {

        const defaultInnerHTML = btn.innerHTML;

        const loadingInnerHTML =
            (options.loadingHtml ?? options.loadingText ?? defaultInnerHTML) +
            (options.loadingIcon ?? "");

        return {
            element: btn,
            defaultInnerHTML,
            loadingInnerHTML,
            classes: {
                disabled: options?.classes?.disabled ?? '',
                loading: options?.classes?.loading ?? ''
            }
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
    const disabled = (flag = true) => setState({ isDisabled: flag });
    const loading = (flag = true) => setState({ isLoading: flag, isDisabled: flag });
    const reset = () => setState({ ...initialState });

    // --- dom updates ---
    function renderUpdate() {
        if (targetBtnList.length === 0) {
            console.warn(`'${btnSelector}' not found. Please check your selector.`);
            return;
        }
        targetBtnList.forEach(({ element, defaultInnerHTML, loadingInnerHTML, classes }) => {

            const { isLoading, isDisabled } = state;

            const html = isLoading ? loadingInnerHTML : defaultInnerHTML;

            // update innerHTML only if needed
            if (element.innerHTML !== html) {
                element.innerHTML = html;
            }

            // update disabled attribute
            if (element.disabled !== isDisabled) {
                element.disabled = isDisabled;
            }

            // handle class updates
            if (classes?.disabled?.trim().length > 0) {
                element.classList.toggle(classes.disabled, isDisabled);
            }
            if (classes?.loading?.trim().length > 0) {
                element.classList.toggle(classes.loading, isLoading);
            }
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

    function getButtonElements() {

        if (btnSelector instanceof HTMLElement) {
            return [btnSelector];
        }

        if (typeof btnSelector === "string" && btnSelector.trim().length > 0) {
            return Array.from(document.querySelectorAll(btnSelector));
        }

        console.warn("Please provide a valid button selector.");

        return [];
    }

    const getState = () => ({
        initial: { ...initialState },
        current: { ...state }
    });

    const getTarget = () => targetBtnList;


    // init
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
