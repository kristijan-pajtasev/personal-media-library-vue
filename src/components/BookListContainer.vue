<script setup lang="ts">
import BookList from './BookList.vue';
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

// export default {
//   components: {BookList},
//   data() {
//     return {
//       author: "",
//       title: ""
//     }
//   },
//   mounted() {
//     this.$store.dispatch('book/getBooks')
//   },
//   computed: {
//     books() {
//       const books = this.$store.getters["book/getAllBooks"];
//
//       if(!books) return;
//
//       const author = this.author
//       const title = this.title
//       const filteredBooks = books.filter(book => {
//         if(author.length > 0) {
//           if(!book.author.toLowerCase().includes(author.toLowerCase())) return false;
//         }
//         if(title.length > 0) {
//           if(!book.title.toLowerCase().includes(title.toLowerCase())) return false;
//         }
//         return true
//       })
//       return filteredBooks
//     },
//     loading() {
//       return this.$store.getters['book/isLoading']
//     }
//   }
// }
</script>

<template>
  <div>
    <div v-if="loading">Loading data</div>
    <div v-else>
      <div v-if="!books">No books data</div>
      <div v-else>
        <div class="BookListContainer__filterContainer">
          <input class="BookListContainer__input" type="text" v-model="title" placeholder="Title" />
          <input class="BookListContainer__input" type="text" v-model="author" placeholder="Author" />
        </div>
        <BookList :books="books"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.BookListContainer__filterContainer {
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 480px;
}

.BookListContainer__filterContainer>* {
  flex: 1;
}

.BookListContainer__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.4rem;
  outline: none;
}

.BookListContainer__input:focus {
  margin-bottom: 1rem;
  border: thin solid #00bd7e;
  box-shadow: #ccc 5px 5px 5px;
}

@media screen and (max-width: 480px) {
  .BookListContainer__filterContainer {
    flex-direction: column;
    gap: 0.5rem
  }

  .BookListContainer__input {
    margin-bottom: 0;
    width: 100%;
  }
}
</style>