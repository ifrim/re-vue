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
import { NOTIFICATION } from '../state/static-data.js';
import CreateEventForm from './form.vue';
import { validate } from './validations.js';

export default {
  components: {
    CreateEventForm
  },
  data () {
    return {
      state: this.app.state,
      goToHome: () => this.$router.push('/'),
      onSave: (data) => {
        let errors = validate(data);
        if (errors) return errors;
        this.app.addEvent(data);
        this.goToHome();
        this.app.notify('Event added successfully!', NOTIFICATION.SUCCESS);
      },
      onCancel: () => this.goToHome()
    };
  },
  props: ['app']
};
</script>

<style scoped lang="less">
.create-event-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
