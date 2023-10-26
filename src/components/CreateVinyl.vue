<script>
export default {
  data() {
    return {
      title: "",
      author: "",
    }
  },
  mounted() {
    console.log("create vinyl component")
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit")
      this.$store.dispatch("vinyl/addVinyl", {
        title: this.title,
        author: this.author,
        user: this.$store.getters["user/getUserData"]()
      }).then(() => {
        this.$router.push({name: "vinyl"})
      })
    }
  }
}
</script>

<template>
  <div class="CreateVinyl">
    <h2 class="CreateVinyl__title">Add a Vinyl</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title" class="CreateVinyl__label">Title:</label>
        <input id="title" class="CreateVinyl__input" v-model="title" placeholder="Title" type="text"/>
      </div>
      <div>
        <label for="author" class="CreateVinyl__label">Author:</label>
        <input id="author" class="CreateVinyl__input" v-model="author" placeholder="Author" type="text"/>
      </div>
      <div>
        <button class="CreateVinyl__button">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.CreateVinyl {
  max-width: 600px;
  margin: 1rem auto;
}

.CreateVinyl__title {
  color: #00bd7e;
  margin-bottom: 1rem;
  text-align: center;
}

.CreateVinyl__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.4rem;
  outline: none;
  width: 100%;
}

.CreateVinyl__input:focus {
  margin-bottom: 1rem;
  border: thin solid #00bd7e;
  box-shadow: #ccc 5px 5px 5px;
}

.CreateVinyl__button {
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

.CreateVinyl__label {
  padding: 0.4rem;
}
</style>