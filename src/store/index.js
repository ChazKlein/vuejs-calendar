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
        events: [
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
            // return a promise
            return new Promise((resolve, reject) => {
                // Create obj with data to push
                let obj = {
                    description: payload,
                    date: context.state.eventFormDate
                }
                // Use Axios to post that to the server (post response)
                Axios.post('/add_event', obj).then(response => {
                    if (response.status === 200) {
                        // commit it for action
                        context.commit('addEvent', obj);
                        // if it's a good response then pass resolve
                        resolve();
                    } else {
                        reject();
                    }
                    console.log(response);
                })
            });
            
        }
    }
});