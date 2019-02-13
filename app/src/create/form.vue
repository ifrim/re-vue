<template>
  <form>
    <label>
      <span>Name</span>
      <input type="text" v-model="name" />
    </label>
    <label>
      <span>Location</span>
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
    <label>
      <span>Start Date</span>
      <input type="date" v-model="startDate" />
    </label>
    <label>
      <span>End Date</span>
      <input type="date" v-model="endDate" />
    </label>
    <label>
      <span>Type</span>
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

export default {
  name: 'CreateEventForm',
  data: function () {
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
      description: ''
    };
  },
  methods: {
    cancel: function () {
      this.onCancel();
    },
    save: function (...args) {
      this.onSave({
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        location: this.location,
        type: this.type === 'other' ? this.otherType : this.type,
        requiresInvitation: this.requiresInvitation,
        description: this.description
      });
    }
  },
  props: ['onCancel', 'onSave']
};
</script>

<style scoped lang="less">
  form {
    text-align: left;
    max-width: 1024px;

    label {
      display: block;
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }

      > span {
        display: inline-block;
      }
    }
  }
</style>
