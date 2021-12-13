<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." v-focus />

    <div class="app__btns">
      <my-button> Создать пользователя </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model="dialogVisible" :show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
    <div v-else>Идет загрузка...</div>
  </div>
</template>
    
<script>
import PostForm from "@/Components/PostForm";
import PostList from "@/Components/PostList";
import MyButton from "@/Components/UI/MyButton.vue";
import MyDialog from "@/Components/UI/MyDialog.vue";
import MySelect from "@/Components/UI/MySelect.vue";
import VIntersection from "@/Directives/VIntersection";
import { usePosts } from "@/hooks/usePosts.js";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
    VIntersection,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid orangered;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: teal;
}

.like {
  margin: 15px 0 15px 0;
}
</style>
