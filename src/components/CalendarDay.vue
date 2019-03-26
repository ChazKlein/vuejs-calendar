<template>
    <div :class="classObject" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events" :key="event.id">{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [ 'day' ],
        computed: {
            events() {
                return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
            },
            classObject() {
                let eventFormDate = this.$store.state.eventFormDate;
                let eventFormActive = this.$store.state.eventFormActive;
                return {
                    day: true,
                    today: this.day.isSame(this.$moment(), 'day'), // if its today then add that class
                    past: this.day.isBefore(this.$moment(), 'day'), // if it's before today then add that class
                    active: eventFormDate.isSame(this.day, 'day') && eventFormActive
                }
            }
        },
        methods: {
            captureClick(event) {
                //console.log(event); // Log event click
                // Create and store commit for eventFormPos in state based of x and y of click event.
                this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY });
                // Commit true value for event form open
                this.$store.commit('eventFormActive', true);
                // Pass day of click in payload
                this.$store.commit('eventFormDate', this.day);
            }
        }
    }
</script>

<style scoped>

</style>