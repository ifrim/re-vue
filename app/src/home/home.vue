<template>
  <div class="home">
    <Notification
      v-if="notification"
      :type="notification.type"
    >
      {{ notification.message }}
    </Notification>
    <header>
      <button @click="goToCreate">{{ $t('new event') }}</button>
      <select v-model="locale">
        <option v-for="l in locales" :key="l">{{ l }}</option>
      </select>
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
import locales from '../i18n/index.js';
import EventsList from './events-list.vue';
import Notification from '../commons/components/notification.vue';

export default {
  components: {
    EventsList,
    Notification
  },
  data () {
    return {
      locations,
      locales: Object.keys(locales),
      locale: this.$i18n.locale
    };
  },
  methods: {
    goToCreate () {
      this.$router.push('create');
    }
  },
  computed: mapState(['events', 'notification']),
  watch: {
    locale (lang) {
      this.$i18n.locale = lang;
    }
  }
};
</script>

<style scoped lang="less">
.home {
  padding: 40px;

  > header {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    button {
      text-transform: capitalize;
    }

    select {
      height: 30px;
      margin-left: 30px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
