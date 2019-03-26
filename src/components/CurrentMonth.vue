<template>
    <div>
        <div>{{ formattedDate }}</div>
        <button @click="dec">-</button>
        <button @click="inc">+</button>
    </div>
</template>

<script>
    export default {
        methods: {
            dec() {
                // Commit and call mutation method from state and send payload
                if (this.month === 1) {
                    // if month is set to 1 then set it back to 12
                    this.$store.commit('setCurrentMonth', 12);
                    this.$store.commit('setCurrentYear', this.year - 1);
                } else {
                    this.$store.commit('setCurrentMonth', this.month - 1);
                }
                this.$store.commit('eventFormActive', false);
            },

            inc() {
                if (this.month === 12) {
                    this.$store.commit('setCurrentMonth', 1);
                    this.$store.commit('setCurrentYear', this.year + 1);
                } else {
                    this.$store.commit('setCurrentMonth', this.month + 1);
                }
                this.$store.commit('eventFormActive', false);
            }
        },
        computed: {
            formattedDate() {
                // pass in computed properties for month and year and format it
                return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
            },
            // Computed properties for Vuex store state management
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
        }
    }
</script>

<style scoped>

</style>