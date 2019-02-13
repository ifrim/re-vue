<template>
  <div class="events-list">
    <h1>Events</h1>
    <EventsListRow
      v-for="event in events"
      :event="event"
      :key="event.id"
    />
  </div>
</template>

<script>
import EventsListRow from './events-list-row.vue';

export default {
  components: {
    EventsListRow
  },
  props: ['events']
};
</script>
