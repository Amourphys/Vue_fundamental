<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px;
  background-color: teal;
  color: crimson;
  border: 1px solid crimson;
  border-radius: 5px;
}
</style>