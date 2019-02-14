<template>
  <form>
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
    <label :class="{error: isError('name')}">
      <span>Name <FormFieldRequired /></span>
      <input type="text" v-model="name" />
    </label>
    <label :class="{error: isError('location')}">
      <span>Location <FormFieldRequired /></span>
      <select v-model="location">
        <option value="">Select&hellip;</option>
        <option
          v-for="loc in locations"
          :value="loc"
          :key="loc"
        >
          {{loc}}
        </option>
      </select>
    </label>
    <label :class="{error: isError('startDate')}">
      <span>Start Date <FormFieldRequired /></span>
      <input type="date" v-model="startDate" />
    </label>
    <label :class="{error: isError('endDate')}">
      <span>End Date <FormFieldRequired /></span>
      <input type="date" v-model="endDate" />
    </label>
    <label :class="{error: isError('type')}">
      <span>Type <FormFieldRequired /></span>
      <label
        v-for="t in types"
        :key="t"
      >
        <input
          type="radio"
          :value="t"
          v-model="type"
        />
        <span>{{t}}</span>
      </label>
      <label>
        <input type="radio" value="other" v-model="type" />
        <span>Other</span>
        <input type="text" v-model="otherType" />
      </label>
    </label>
    <label>
      <input type="checkbox" v-model="requiresInvitation" />
      <span>Requires invitation</span>
    </label>
    <label>
      <span>Description</span>
      <textarea v-model="description"></textarea>
    </label>
    <div>
      <button @click="cancel">Cancel</button>
      <button @click="save">Save</button>
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
    cancel () {
      this.onCancel();
    },
    save () {
      this.errors = this.onSave({
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
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

    .error-message {
      color: red;
    }

    label {
      display: block;
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      &.error {
        color: red;

        > input,
        > select,
        > textarea {
          border-color: red;
        }
      }

      > span {
        display: inline-block;
      }
    }

    button + button {
      margin-left: 20px;
    }
  }
</style>
