<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 10px"
        >About</my-button
      >
      <my-button @click="$router.push('/store')" style="margin-left: 10px"
        >Store</my-button
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 50px;
  background-color: rgb(127, 145, 145);
  box-shadow: 2px 2px 4px darkmagenta;
  align-items: center;
  padding: 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>