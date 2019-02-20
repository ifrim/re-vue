<template>
  <div class="event-row">
    <div class="event-name">{{ event.name }}</div>
    <div class="event-subtitle">
      <span>{{ $t('from') }}: <b>{{ event.startDate | date(locale) }}</b> {{ $t('to') }}: <b>{{ event.endDate | date(locale) }}</b></span>
      <span>{{ $t('location') }}: <b>{{ event.location }}</b></span>
      <span>{{ $t('type') }}: <b>{{ $t(event.type.toLowerCase()) }}</b></span>
    </div>
    <div class="event-requires-invitation" v-if="event.requiresInvitation">{{ $t('it requires invitation') }}</div>
    <div class="event-description">{{ event.description }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      locale: this.$i18n.locale
    };
  },
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
      text-transform: capitalize;

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
