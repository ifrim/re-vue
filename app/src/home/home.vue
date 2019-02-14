<template>
  <div class="home">
    <Notification
      v-if="state.notification"
      :type="state.notification.type"
    >
      {{state.notification.message}}
    </Notification>
    <header>
      <button @click="goToCreate">New Event</button>
    </header>
    <EventsList
      :events="state.events"
      :locations="locations"
    />
  </div>
</template>

<script>
import { locations } from '../state/static-data.js';
import EventsList from './events-list.vue';
import Notification from '../commons/components/notification.vue';

export default {
  components: {
    EventsList,
    Notification
  },
  data () {
    return {
      state: this.app.state,
      locations
    };
  },
  methods: {
    goToCreate () {
      this.$router.push('create');
    }
  },
  props: ['app']
};
</script>

<style scoped lang="less">
.home {
  padding: 40px;

  > header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
