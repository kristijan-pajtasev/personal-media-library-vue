<script>
export default {
  props: ["books"],
  data() {
    return {
    }
  },
  methods: {
    handleDelete(id) {
      console.log("handle delete", id);
      const _this = this;
      this.$store.dispatch("book/deleteBook", id)
          .then(
              () => {
                this.$store.dispatch("book/getBooks")
              }
          )
    }
  }
}
</script>

<template>
  <div class="BookList">
    <ul class="BookList__list">
      <li v-for="book in books" :key="book.id" class="BookList__listItem">
        <div>{{book.title}}</div>
        <div>{{ book.author }}</div>
        <div>
          <button type="button" @click="handleDelete(book.id)">Delete</button>
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
  border-bottom: thin solid hsla(160, 100%, 37%, 1)
}

.BookList__listItem>* {
  flex: 1;
}
</style>