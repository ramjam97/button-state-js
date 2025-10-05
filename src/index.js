function ButtonState(domSelectors = '', options = {}) {

    const config = {
        state: getValue(options, 'state', {}),
        loading: {
            class: getValue(options, 'loading.class', 'loading'),
            html: getValue(options, 'loading.html', null),
            icon: getValue(options, 'loading.icon', ''),
        },
        disabled: {
            class: getValue(options, 'disabled.class', 'disabled'),
        },
        display: {
            show: {
                class: getValue(options, 'display.show.class', 'show'),
            },
            hide: {
                class: getValue(options, 'display.hide.class', 'hide'),
            },
        },
    }

    const target = getDomElements().map(el => ({
        dom: el,
        defaultText: el.textContent,
        defaultHtml: el.innerHTML,
    }));

    const state = {
        loading: config.state.loading || false,
        disabled: config.state.disabled || false,
        display: config.state.display || true
    }

    function getValue(obj = {}, key = '', defaultVal = null) {
        return key.split('.').reduce((acc, k) => {
            if (acc && typeof acc === 'object' && k in acc) return acc[k];
            acc = undefined; // ensure no further traversal
            return defaultVal;
        }, obj);
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

    function renderUpdate() {
        console.log(state);

        target.forEach(item => {
            const element = item.dom;

            let loadingHtml = typeof config.loading.html === 'function' ?
                config.loading.html(item.defaultHtml) : config.loading.html;
            if (loadingHtml === null) loadingHtml = item.defaultHtml;

            if (config.loading.icon) {
                loadingHtml = `${loadingHtml}${config.loading.icon}`;
            }

            element.disabled = state.disabled;
            element.innerHTML = state.loading ? loadingHtml : item.defaultHtml;

            if (state.display) {
                if (element.style.getPropertyValue('display') === 'none') {
                    element.style.removeProperty('display');
                }
            } else {
                element.style.setProperty('display', 'none', 'important');
            }
            element.classList.toggle('loading', state.loading);
            element.classList.toggle('disabled', state.disabled);
            element.classList.toggle('hidden', !state.display);
        });
    }

    function setState(val = {}) {
        if (typeof val === 'object') {
            Object.assign(state, val);
        }
        renderUpdate();
        return state;
    }

    function loading(isLoding = true) {
        setState({ loading: isLoding, disabled: isLoding });
    }


    function disabled(isDisabled = true) {
        setState({ disabled: isDisabled });
    }


    function show(showing = true) {
        setState({ display: showing });
    }

    function hide(hidden = true) {
        setState({ display: !hidden });
    }

    return {
        target,
        state,
        loading,
        disabled,
        show,
        hide
    }
}