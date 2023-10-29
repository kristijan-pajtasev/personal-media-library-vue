<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex';
import {useRouter, useRoute} from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const artist = ref("");
const album = ref("");
const id = ref("");

onMounted(() => {
  console.log("on mounted")
  const itemId = route.params.id;
  const vinyls = store.getters["vinyl/getAllVinyls"];
  if (!vinyls) {
    store.dispatch("vinyl/getVinyls").then(() => {
      const vinyl = store.getters["vinyl/getVinylById"](itemId);
      console.log(vinyl)
      artist.value = vinyl.artist;
      album.value = vinyl.album;
      id.value = vinyl.id;
    })
  } else {
    const vinyl = store.getters["vinyl/getVinylById"](id);
    artist.value = vinyl.artist;
    album.value = vinyl.album;
    id.value = vinyl.id;
  }
});

// functions
function handleSubmit() {
  console.log("handleSubmit")
  store.dispatch("vinyl/editVinyl", {
    artist: artist.value,
    album: album.value,
    id: id.value,
    user: store.getters["user/getUserData"]()
  }).then(() => {
    router.push({name: "vinyl"})
  })
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