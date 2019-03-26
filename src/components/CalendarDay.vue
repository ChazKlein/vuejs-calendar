<template>
    <div :class="classObject">
        {{ day.format('D') }}
    </div>
</template>

<script>
    export default {
        props: [ 'day' ],
        computed: {
            classObject() {
                return {
                    day: true,
                    today: this.day.isSame(this.$moment(), 'day'), // if its today then add that class
                    past: this.day.isBefore(this.$moment(), 'day') // if it's before today then add that class
                }
            }
        }
    }
</script>

<style scoped>

</style>