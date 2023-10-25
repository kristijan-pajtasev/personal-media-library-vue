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
  <div class="CreateBook">
    <h2 class="CreateBook__title">Add a Book</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <input class="CreateBook__input" v-model="title" placeholder="title" type="text"/>
      </div>
      <div>
        <input class="CreateBook__input" v-model="author" placeholder="author" type="text"/>
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
}

.CreateBook__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.8rem;
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
  padding: 0.4rem 0.8rem;
  font-weight: bold;
}
</style>