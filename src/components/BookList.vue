<script>
export default {
  props: ["books"],
  data() {
    return {}
  },
  computed: {
    hasUser() {
      return this.$store.getters['user/getUserData']()
    }
  },
  methods: {
    handleDelete(id) {
      this.$store.dispatch("book/deleteBook", {bookId: id, user: this.$store.getters["user/getUserData"]()})
          .then(
              () => {
                this.$store.dispatch("book/getBooks")
              }
          )
    },
    handleEdit(id) {
      this.$router.push({name: "editBook", params: {id}})
    },
    displayedText(text) {
      if(!text) return ""
      return text
          .split(" ")
          .map(word => {
        if(["a", "an"].includes(word.toLowerCase())) return word;
        else {
          return `${word[0].toUpperCase()}${word.slice(1)}`
        }
      })
      .join(" ")
    }
  }
}
</script>

<template>
  <div class="BookList">
    <ul class="BookList__list">
      <li v-for="book in books" :key="book.id" class="BookList__listItem">
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
  border-bottom: thin solid hsla(160, 100%, 37%, 1)
}

.BookList__listItem > * {
  flex: 3;
}

.BookList__listItem>.BookList__itemControls {
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
</style>