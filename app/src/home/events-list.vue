<template>
  <div class="events-list">
    <h1>Events</h1>
    <div class="filters">
      <span class="title">Filters</span>
      <div>
        <label>Location</label>
        <select v-model="location">
          <option value="">Any</option>
          <option
            v-for="loc in locations"
            :value="loc"
            :key="loc"
          >
            {{loc}}
          </option>
        </select>
        <label>Type</label>
        <select v-model="type">
          <option value="">Any</option>
          <option
            v-for="t in types"
            :value="t"
            :key="t"
          >
            {{t}}
          </option>
        </select>
      </div>
    </div>
    <EventsListRow
      v-for="event in filteredEvents"
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
  data () {
    return {
      location: '',
      type: '',
      types: [...new Set(this.events.map(e => e.type))]
    };
  },
  computed: {
    filteredEvents () {
      let events = this.events;
      if (this.location) events = events.filter(e => e.location === this.location);
      if (this.type) events = events.filter(e => e.type === this.type);
      return events;
    }
  },
  props: ['events', 'locations']
};
</script>

<style scoped lang="less">
.filters {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px dotted blue;
  border-bottom: 1px dotted blue;
  margin-bottom: 20px;

  > .title {
    font-weight: bold;
  }

  label {
    margin-left: 30px;

    + select {
      margin-left: 8px;
    }
  }
}
</style>
