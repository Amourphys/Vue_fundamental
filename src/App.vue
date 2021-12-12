<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <my-button @click="fetchPosts">Получить посты</my-button>
      <!--  <input type="text" v-model="modificatorValue" /> -->
      <my-button @click="showDialog"> Создать пользователя </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model="dialogVisible" :show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        :style="{
          background: yellow,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>

    <div class="like">
      <div>
        <button @click="addLike">Like</button>
        <button @click="addDislike">Dislike</button>
      </div>
      <div>
        Кол-во лайков: <strong>{{ likes }}</strong>
      </div>
      <div>
        Кол-во дизлайков: <strong>{{ dislikes }}</strong>
      </div>
    </div>
  </div>
</template>
    
<script>
import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/MyButton.vue";
import MyDialog from "./Components/UI/MyDialog.vue";

import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      posts: [],
      dialogVisible: false,
      /* modificatorValue: "", */
      isPostLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.dislikes += 1;
    },
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        setTimeout(async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = response.data;
          this.isPostLoading = false;
          console.log(response);
        }, 1000);
      } catch (e) {
        alert("Error");
      } finally {
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    /* selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue]);
      });
    }, */
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

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

.like {
  margin: 15px 0 15px 0;
}
</style>
