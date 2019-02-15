<template>
  <div class="home">
    <Notification
      v-if="notification"
      :type="notification.type"
    >
      {{notification.message}}
    </Notification>
    <header>
      <button @click="goToCreate">New Event</button>
    </header>
    <EventsList
      :events="events"
      :locations="locations"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
      locations
    };
  },
  methods: {
    goToCreate () {
      this.$router.push('create');
    }
  },
  computed: mapState(['events', 'notification'])
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
