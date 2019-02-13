<template>
  <div :class="['notification', type]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['type']
};
</script>

<style scoped lang="less">
.notification {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;

  &.error {
    background-color: pink;
  }

  &.warning {
    background-color: orange;
  }

  &.success {
    background-color: lightgreen;
  }
}
</style>
