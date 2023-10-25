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
      const books = this.$store.getters["book/getAllBooks"];
      console.log(books)
      // return books
      if(!books) return;

      const author = this.author
      const title = this.title
      const filteredBooks = books.filter(book => {
        if(author.length > 0) {
          if(!book.author.toLowerCase().includes(author.toLowerCase())) return false;
        }
        if(title.length > 0) {
          if(!book.title.toLowerCase().includes(title.toLowerCase())) return false;
        }
        return true
      })
      return filteredBooks
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