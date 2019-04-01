import Vue from 'vue';


import store from './store';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
// Create prototype to register library as data property
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }});

import App from './components/App.vue';

export default function(events) {
    // Initial state is going to be (empty object, store.state, events property object )
    let initialState = Object.assign({}, store.state, { events });
    store.replaceState(initialState);

    return new Vue({
        data: {
            moment
        },
        components: {
            App
        },
        store,
        render(createElement) {
            return createElement(
                'div',
                { attrs: { id: 'app' }},
                [
                    createElement('app')
                ]
            );
        },
    });

    
}