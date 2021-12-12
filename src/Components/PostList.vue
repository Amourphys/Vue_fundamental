<template>
  <div v-if="posts.length > 0">
    <h3>Список пользователей</h3>
    <transition-group name="post-list">
      <post-item
        class="list-item"
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: red">Список пользователей пуст</h2>
</template>

<script>
import PostItem from "@/Components/PostItem";

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  margin-top: 15px;
  padding: 15px;
  border: 2px solid teal;
}

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s;
}
.post-list-enter, .post-list-leave-to /*.post-list-leave-active  до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move {
  transition: transform 1s;
}
</style>