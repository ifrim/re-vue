<template>
  <form novalidate="novalidate">
    <div
      class="errors"
      v-if="errors"
    >
      <div
        class="error-message"
        v-for="error in errors.messages"
        :key="error"
      >
        {{error}}
      </div>
    </div>
    <md-field :class="['md-required', {'md-invalid': isError('name')}]">
      <label>Name</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <md-field :class="['md-required', {'md-invalid': isError('location')}]">
      <label for="location">Location</label>
      <md-select v-model="location">
        <md-option value="">Select&hellip;</md-option>
        <md-option
          v-for="loc in locations"
          :value="loc"
          :key="loc"
        >
          {{loc}}
        </md-option>
      </md-select>
    </md-field>
    <md-datepicker v-model="startDate" :class="['md-required', {'md-invalid': isError('startDate')}]">
      <label>Start date</label>
    </md-datepicker>
    <md-datepicker v-model="endDate" :class="['md-required', {'md-invalid': isError('endDate')}]">
      <label>End date</label>
    </md-datepicker>
    <div>
      <label :class="['type-label', {error: isError('type')}]">Type *</label>
      <md-radio
        v-for="t in types"
        v-model="type"
        :key="t"
        :value="t"
      >
        {{t}}
      </md-radio>
      <br />
      <md-radio v-model="type" value="other">
        <md-field class="other-type-field">
          <label>Other</label>
          <md-input v-model="otherType"></md-input>
        </md-field>
      </md-radio>
    </div>
    <md-checkbox v-model="requiresInvitation">Requires invitation</md-checkbox>
    <md-field>
      <label>Description</label>
      <md-textarea v-model="description"></md-textarea>
      <span class="md-helper-text">Add a description of the event.</span>
    </md-field>
    <div>
      <md-button class="md-accent" @click="cancel">Cancel</md-button>
      <md-button class="md-primary" @click="save">Save</md-button>
    </div>
  </form>
</template>

<script>
import { EVENT_TYPES, locations } from '../state/static-data.js';
import FormFieldRequired from '../commons/components/form-field-required.vue';

export default {
  components: {
    FormFieldRequired
  },
  data () {
    return {
      name: '',
      startDate: '',
      endDate: '',
      location: '',
      locations,
      type: '',
      otherType: '',
      types: EVENT_TYPES,
      requiresInvitation: false,
      description: '',
      errors: null
    };
  },
  methods: {
    formatDate (date) {
      if (!date) return '';
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    cancel () {
      this.onCancel();
    },
    save () {
      this.errors = this.onSave({
        name: this.name,
        startDate: this.formatDate(this.startDate),
        endDate: this.formatDate(this.endDate),
        location: this.location,
        type: this.type === 'other' ? this.otherType : this.type,
        requiresInvitation: this.requiresInvitation,
        description: this.description
      });
    },
    isError (field) {
      if (!this.errors) return false;
      return this.errors.items.has(field);
    }
  },
  props: ['onCancel', 'onSave']
};
</script>

<style scoped lang="less">
  form {
    text-align: left;
    max-width: 1024px;
    min-width: 600px;

    .error-message {
      color: red;
    }

    .type-label {
      display: block;
      font-size: 16px;
      color: #2c3e50;

      &.error {
        color: red;
      }
    }

    button + button {
      margin-left: 20px;
    }

    .other-type-field {
      top: -30px;
    }
  }
</style>
