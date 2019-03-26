<template>
    <div>
        <div id="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div v-for="weekday in weekDays" :key="weekday.id">
                {{ weekday }}
            </div>
        </div>
        <div id="calendar">
            <!-- Loop through week in weeks -->
            <div v-for="week in weeks" :key="week.id" class="calendar-week">
                <calendar-day v-for="day in week" :key="day.id" :day="day">
                </calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>


<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';

    export default {
        data() {
            return {
                weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            };
        },
        computed: {
            // Computed properties for Vuex store state management
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
            days() {
                // Generating all days in current month
                let days = [];
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
                do {
                    // Add FIRST day of the month to days array
                    days.push(currentDay);
                    // Continually add a day to currentDay variable +=1
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === this.month); // While the currenDay month is equal to the one we set (3)
                
                // Add previous days to start
                currentDay = this.$moment(days[0]);

                const SUNDAY = 0;
                const MONDAY = 1;

                // If currentDay is not equal to Monday
                if (currentDay.day() !== MONDAY) {
                    do {
                        // set currentDay to the current day minus 1 (in a loop)
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        // Unshift (adds it to the beginning of the array)
                        days.unshift(currentDay);
                    } while (currentDay.day() !== MONDAY); // while currentDay is not equal to Monday (1 index)
                }

                

                // Add FOLLOWING days to end
                // Set currentDay to the last day of the month (in the array)
                currentDay = this.$moment(days[days.length - 1]);

                // If currentDay is not equal to Sunday
                if (currentDay.day() !== SUNDAY) {
                    do {
                        // set currentDay to the current day plus 1 (in a loop)
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        // Unshift (adds it to the beginning of the array)
                        days.push(currentDay);
                    } while (currentDay.day() !== SUNDAY); // while currentDay is not equal to Monday (1 index)
                }
                
                // return those days
                return days;
            },
            weeks() {
                // array for weeks (array of arrays)
                let weeks = [];
                let week = [];

                // Get days array from above and then iterate through every day
                for (let day of this.days) {
                    week.push(day);
                    // if week is 7 days
                    if (week.length === 7) {
                        // push week into weeks array
                        weeks.push(week);
                        // then empty week array
                        week = [];
                    }
                }

                return weeks;
            }
        },
        components: {
            CalendarDay,
            CurrentMonth,
            EventForm
        }
    }
</script>

<style scoped>

</style>