/*!
 * ButtonStateJS v1.0.0
 * Description: A lightweight, dependency-free JavaScript utility for managing button UI states — loading, disabled, and visibility — with fully customizable behavior and class handling.
 * Author: Ram Jam
 * GitHub: https://github.com/ramjam97/button-state-js
 * License: ISC
 * Build Date: 2025-10-06 09:43:02 (Asia/Manila)
*/
function ButtonState(domSelectors = '', options = {}) {

    const config = {
        state: {
            ...{ loading: false, disabled: false, display: true },
            ...arrGet(options, 'state', {})
        },
        loading: {
            class: arrGet(options, 'loading.class', 'loading'),
            html: arrGet(options, 'loading.html', null),
            icon: arrGet(options, 'loading.icon', ''),
        },
        disabled: {
            class: arrGet(options, 'disabled.class', 'disabled'),
        },
        display: {
            show: {
                class: arrGet(options, 'display.show.class', 'show'),
            },
            hide: {
                class: arrGet(options, 'display.hide.class', 'hide'),
            },
        },
        onChange: arrGet(options, 'onChange', null),
    }

    const dom = getDomElements();

    const target = dom.map(el => ({
        dom: el,
        defaultText: el.textContent,
        defaultHtml: el.innerHTML,
        defaultDisplay: getComputedStyle(el).display
    }));

    const state = {
        loading: 'loading' in config.state ? config.state.loading : false,
        disabled: 'disabled' in config.state ? config.state.disabled : false,
        display: 'display' in config.state ? config.state.display : true,
    }

    const api = {
        dom,
        target,
        state,
        setState,
        refresh: renderUpdate,
        loading,
        disabled,
        show,
        hide,
    }

    function arrGet(obj, path, defaultVal = null) {
        if (!obj || typeof obj !== 'object') return defaultVal;
        return path.split('.').reduce((acc, key) => {
            return acc && key in acc ? acc[key] : undefined;
        }, obj) ?? defaultVal;
    }

    function getDomElements() {
        if (!domSelectors) return [];
        if (domSelectors instanceof HTMLElement) return [domSelectors];
        if (typeof domSelectors === "string") return [...document.querySelectorAll(domSelectors)];
        if (Array.isArray(domSelectors)) {
            return domSelectors.flatMap(
                item => item instanceof HTMLElement ? [item] :
                    typeof item === "string" ? [...document.querySelectorAll(item)] : []
            );
        }
        return [];
    };

    function renderUpdate(isDirty = false) {

        target.forEach(item => {
            const element = item.dom;

            if (!document.body.contains(element)) return;

            let loadingHtml = typeof config.loading.html === 'function' ?
                config.loading.html(item.defaultHtml) : config.loading.html;
            if (loadingHtml === null) loadingHtml = item.defaultHtml;

            if (config.loading.icon) {
                loadingHtml = `${loadingHtml}${config.loading.icon}`;
            }

            element.disabled = state.disabled;
            element.innerHTML = state.loading ? loadingHtml : item.defaultHtml;

            if (state.display) {
                element.style.display = item.defaultDisplay === 'none' ? '' : item.defaultDisplay;
            } else {
                element.style.display = 'none';
            }

            element.classList.toggle(config.loading.class, state.loading);
            element.classList.toggle(config.disabled.class, state.disabled);
            element.classList.toggle(config.display.show.class, state.display);
            element.classList.toggle(config.display.hide.class, !state.display);
        });

        if (isDirty && typeof config.onChange === 'function') config.onChange(state, dom);
    }

    const isEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null || typeof a !== typeof b) return false;
        if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((v, i) => isEqual(v, b[i]));
        if (typeof a === "object") {
            const keysA = Object.keys(a), keysB = Object.keys(b);
            return keysA.length === keysB.length && keysA.every(k => isEqual(a[k], b[k]));
        }
        return false;
    }

    function setState(val = {}) {
        if (!val || typeof val !== 'object') return api;

        const oldState = { ...state };
        Object.assign(state, val);

        const hasChange = !isEqual(oldState, state);
        renderUpdate(hasChange);

        return api;
    }

    // ---------- actions ----------

    function loading(isLoading = true) {
        const val = Boolean(isLoading);
        return setState({ loading: val, disabled: val });
    }

    function disabled(isDisabled = true) {
        return setState({ disabled: Boolean(isDisabled) });
    }

    function show(showing = true) {
        return setState({ display: Boolean(showing) });
    }

    function hide(hidden = true) {
        return setState({ display: !Boolean(hidden) });
    }

    return api;
}