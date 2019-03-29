<template>
  <div id="event-form" :class="{ active: active }" :style="{ top: `${top}px`, left: `${left}px` }">
    <h4>Add an event</h4>
    <!-- <p>{{ date }}</p> -->
    <div class="text">
      <input
        v-focus
        type="text"
        v-model="description"
        placeholder="Build a flying car"
        @keyup.enter="create"
      >
    </div>
    <div class="buttons">
      <button @click="create">Create</button>
    </div>
    <button id="close-button" @click="close">&#10005</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: ""
    };
  },
  methods: {
    close() {
      this.$store.commit("eventFormActive", false);
    },
    create() {
      if (this.description.length > 0) {
        this.$store.dispatch("addEvent", this.description);
        this.description = "";
        this.$store.commit("eventFormActive", false);
      }
    }
  },
  computed: {
    date() {
      return this.$moment(this.$store.state.eventFormDate).format(
        "dddd, MMM Do"
      );
    },
    active() {
      return this.$store.state.eventFormActive;
    },
    // Computed properties for Vuex store state management (top and left positions)
    top() {
      // This way or with temprate literals
      return this.$store.state.eventFormPosY;
      // return `${this.$store.state.eventFormPosY}px`;
    },
    left() {
      return this.$store.state.eventFormPosX;
    }
  },
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
};
</script>

<style scoped>
</style>