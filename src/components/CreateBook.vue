<script>
export default {
  data() {
    return {
      title: "",
      author: "",
    }
  },
  mounted() {
    console.log("create book component")
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit")
      this.$store.dispatch("book/addBook", {
        title: this.title,
        author: this.author
      }).then(() => {
        this.$router.push({name: "book"})
      })
    }
  }
}
</script>

<template>
  <div>
    <div>add book</div>
    <form @submit.prevent="handleSubmit">
      <div>
        <input v-model="title" placeholder="title" type="text"/>
      </div>
      <div>
        <input v-model="author" placeholder="author" type="text"/>
      </div>
      <div>
        <button>add book</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>