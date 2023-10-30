<script setup lang="ts">
import {ref, computed, defineProps} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const props = defineProps({"books": Array<{ author: string, id: string, title: string }>});

const store = useStore()
const router = useRouter();

// functions
function handleDelete(id: string) {
  store.dispatch("book/deleteBook", {bookId: id, user: store.getters["user/getUserData"]()})
      .then(
          () => {
            store.dispatch("book/getBooks")
          }
      )
}

function handleEdit(id: string) {
  router.push({name: "editBook", params: {id}})
}

function displayedText(text: string) {
  if (!text) return ""
  return text
      .split(" ")
      .map(word => {
        if (["a", "an"].includes(word.toLowerCase())) return word;
        else {
          return `${word[0].toUpperCase()}${word.slice(1)}`
        }
      })
      .join(" ")
}

const hasUser = computed(() => {
  return store.getters['user/getUserData']();
})
</script>

<template>
  <div class="BookList">
    <ul class="BookList__list">
      <li v-for="book in props.books" :key="book.id" class="BookList__listItem">
        <div>{{ displayedText(book.title) }}</div>
        <div>{{ displayedText(book.author) }}</div>
        <div class="BookList__itemControls" v-if="hasUser">
          <button type="button" class="BookList__editButton" @click="handleEdit(book.id)">Edit</button>
          <button type="button" class="BookList__deleteButton" @click="handleDelete(book.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.BookList {
  max-width: 800px;
  margin: auto;
}

.BookList__list {
  list-style: none;
  padding: 0;
}

.BookList__listItem {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: thin solid hsla(160, 100%, 37%, 0.3);
}

.BookList__listItem > * {
  flex: 3;
}

.BookList__listItem > .BookList__itemControls {
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2;
}

.BookList__editButton {
  background: none;
  border: none;
  color: #00bd7e;
  cursor: pointer;
  font-weight: bold;
}

.BookList__deleteButton {
  background: none;
  border: none;
  color: #BD003F;
  cursor: pointer;
  font-weight: bold;
}

@media screen and (max-width: 480px) {
  .BookList__listItem {
    flex-direction: column;
    gap: 0.5rem
  }
}
</style>