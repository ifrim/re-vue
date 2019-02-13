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
    />
  </div>
</template>

<script>
import EventsList from './events-list.vue';
import Notification from '../commons/components/notification.vue';

export default {
  components: {
    EventsList,
    Notification
  },
  data: function () {
    return {
      state: this.app.state
    };
  },
  methods: {
    goToCreate: function () {
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

    > button {
      width: 100px;
      height: 30px;
      font-size: 16px;
      border-radius: 4px;
      background-color: navy;
      color: white;
      border: none;

      &:active {
        color: orange;
      }
    }
  }
}
</style>
