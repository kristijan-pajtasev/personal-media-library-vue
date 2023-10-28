<script lang="ts">
export default {
  data() {
    return {
      artist: "",
      album: "",
      id: ""
    }
  },
  mounted() {
    const {id} = this.$route.params;
    const vinyls = this.$store.getters["vinyl/getAllVinyls"];
    if(!vinyls) {
      this.$store.dispatch("vinyl/getVinyls").then(() => {
        const vinyl = this.$store.getters["vinyl/getVinylById"](id);
        console.log(vinyl)
        this.artist = vinyl.artist;
        this.album = vinyl.album;
        this.id = vinyl.id;
      })
    } else {
      const vinyl = this.$store.getters["vinyl/getVinylById"](id);
      this.$store = vinyl.author;
      this.album = vinyl.album;
      this.id = vinyl.id;
    }
  },
  methods: {
    handleSubmit() {
      console.log("handleSubmit")
      this.$store.dispatch("vinyl/editVinyl", {
        title: this.title,
        author: this.author,
        id: this.id,
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
    <h2 class="CreateVinyl__title">Edit a Vinyl</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="album" class="CreateVinyl__label">Album:</label>
        <input id="album" class="CreateVinyl__input" v-model="album" placeholder="Album" type="text"/>
      </div>
      <div>
        <label for="artist" class="CreateVinyl__label">Artist:</label>
        <input id="artist" class="CreateVinyl__input" v-model="artist" placeholder="Artist" type="text"/>
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