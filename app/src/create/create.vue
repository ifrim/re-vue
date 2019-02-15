<template>
  <div class="create-event-page">
    <h1>Create Event</h1>
    <CreateEventForm
      :on-save="onSave"
      :on-cancel="onCancel"
    />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { NOTIFICATION } from '../state/static-data.js';
import CreateEventForm from './form.vue';
import { validate } from './validations.js';

export default {
  components: {
    CreateEventForm
  },
  methods: {
    ...mapMutations(['addEvent']),
    ...mapActions(['notify']),
    goToHome () {
      this.$router.push('/');
    },
    onSave (data) {
      let errors = validate(data);
      if (errors) return errors;
      this.addEvent(data);
      this.goToHome();
      this.notify({ message: 'Event added successfully!', type: NOTIFICATION.SUCCESS });
    },
    onCancel () {
      this.goToHome();
    }
  }
};
</script>

<style scoped lang="less">
.create-event-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
