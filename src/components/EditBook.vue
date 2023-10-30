<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const title = ref("")
const author = ref("")
const id = ref("")

onMounted(() => {
  const routeId = route.params.id;
  const books = store.getters["book/getAllBooks"];
  if (!books) {
    store.dispatch("book/getBooks").then(() => {
      const book = store.getters["book/getBookById"](routeId);
      author.value = book.author;
      title.value = book.title;
      id.value = book.id;
    })
  } else {
    const book = store.getters["book/getBookById"](routeId);
    author.value = book.author;
    title.value = book.title;
    id.value = book.id;
  }
})

// functions
function handleSubmit() {
  store.dispatch("book/editBook", {
    title: title.value,
    author: author.value,
    id: id.value,
    user: store.getters["user/getUserData"]()
  }).then(() => {
    router.push({name: "book"})
  })
}
</script>

<template>
  <div class="CreateBook">
    <h2 class="CreateBook__title">Edit a Book</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title" class="CreateBook__label">Title:</label>
        <input id="title" class="CreateBook__input" v-model="title" placeholder="Title" type="text"/>
      </div>
      <div>
        <label for="author" class="CreateBook__label">Author:</label>
        <input id="author" class="CreateBook__input" v-model="author" placeholder="Author" type="text"/>
      </div>
      <div>
        <button class="CreateBook__button">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.CreateBook {
  max-width: 600px;
  margin: 1rem auto;
}

.CreateBook__title {
  color: #00bd7e;
  margin-bottom: 1rem;
  text-align: center;
}

.CreateBook__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.4rem;
  outline: none;
  width: 100%;
}

.CreateBook__input:focus {
  margin-bottom: 1rem;
  border: thin solid #00bd7e;
  box-shadow: #ccc 5px 5px 5px;
}

.CreateBook__button {
  background: #00bd7e;
  text-align: center;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
  border: none;
  width: 100%;
  padding: 0.4rem 0.4rem;
  font-weight: bold;
}

.CreateBook__label {
  padding: 0.4rem;
}
</style>