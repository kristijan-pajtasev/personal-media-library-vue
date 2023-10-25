<script>
import BookList from './BookList.vue';
export default {
  components: {BookList},
  data() {
    return {}
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
        <BookList books="books"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>