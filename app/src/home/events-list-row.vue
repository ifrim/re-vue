<template>
  <div class="event-row">
    <div class="event-name">{{event.name}}</div>
    <div class="event-subtitle">
      <span>From <b>{{event.startDate | date}}</b> to <b>{{event.endDate | date}}</b></span>
      <span>location <b>{{event.location}}</b></span>
      <span>type <b>{{event.type}}</b></span>
    </div>
    <div class="event-requires-invitation" v-if="event.requiresInvitation">It requires invitation.</div>
    <div class="event-description">{{event.description}}</div>
  </div>
</template>

<script>
export default {
  props: ['event']
};
</script>

<style scoped lang="less">
.event-row {
  display: flex;
  flex-direction: column;
  text-align: left;
  border-bottom: 1px solid #ccc;

  .event-name {
    font-size: 20px;
    font-weight: bold;
    color: blue;
  }

  .event-subtitle {
    display: flex;
    flex-direction: row;
    padding-top: 20px;

    > span {
      flex-basis: 33%;
      font-size: 14px;
      color: gray;
      text-align: left;

      > b {
        color: navy;
      }
    }
  }

  .event-requires-invitation {
    font-size: 14px;
    color: #f44;
    padding-top: 10px;
  }

  .event-description {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  + .event-row {
    padding-top: 20px;
  }
}
</style>
