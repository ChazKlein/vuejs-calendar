import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

// Axios for server calls
import Axios from 'axios';

export default new Vuex.Store({
    state: {
        currentYear: moment().year(), // always get current year
        currentMonth: moment().month() + 1, // always get current month
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [{
                description: 'Random event 1',
                date: moment('2019-03-29', 'YYYY-MM-DD')
            },
            {
                description: 'Random event 2',
                date: moment('2019-03-15', 'YYYY-MM-DD')
            },
            {
                description: 'Random event 3',
                date: moment('2019-02-28', 'YYYY-MM-DD')
            }
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
            // push that variable into state
            state.events.push(payload);
        },
        eventFormDate(state, payload) {
            state.eventFormDate = payload;
        }
    },
    actions: {
        addEvent(context, payload) {
            // Create obj with data to push
            let obj = {
                description: payload,
                date: context.state.eventFormDate
            }
            // commit it for action
            context.commit('addEvent', obj)

            // Use Axios to post that to the server
            Axios.post('/add_event', obj)
        }
    }
});