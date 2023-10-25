<script>
import BookList from './BookList.vue';
export default {
  components: {BookList},
  data() {
    return {
      author: "",
      title: ""
    }
  },
  mounted() {
    this.$store.dispatch('book/getBooks')
  },
  computed: {
    books() {
      return this.$store.getters['book/getAllBooks']
    },
    loading() {
      return this.$store.getters['book/isLoading']
    }
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading data</div>
    <div v-else>
      <div v-if="!books">No books data</div>
      <div v-else>
        <div class="BookListContainer__filterContainer">
          <input type="text" v-model="title" placeholder="title" />
          <input type="text" v-model="author" placeholder="author" />
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
</style>