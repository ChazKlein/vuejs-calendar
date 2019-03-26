import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default new Vuex.Store({
    state: {
        currentYear: moment().year(), // always get current year
        currentMonth: moment().month() + 1, // always get current month
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [
            { description: 'Random event 1', date: moment('2019-03-29', 'YYYY-MM-DD') },
            { description: 'Random event 2', date: moment('2019-03-15', 'YYYY-MM-DD') },
            { description: 'Random event 3', date: moment('2019-02-28', 'YYYY-MM-DD') }
        ],
        eventFormDate: moment()
    },
    mutations: {
        setCurrentMonth(state, payload) {
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        eventFormPos(state, payload) {
            // pass state with payload from event property
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload) {
            state.eventFormActive = payload;
        },
        addEvent(state, payload) {
            state.events.push({
                description: payload,
                date: state.eventFormDate
            });
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    }
});