<script setup>
import {ref, computed} from 'vue'

const msg = 'Hello!'

// functions
function log() {
  console.log(msg)
}

function displayedText(text) {
  if (!text) return ""
  return text
      .split(" ")
      .map(word => {
        if (["a", "an", "at", "and"].includes(word.toLowerCase())) return word;
        else if (word.replace(/\s+/, "").length === 0) return word
        else {
          return `${word[0].toUpperCase()}${word.slice(1)}`
        }
      })
      .join(" ")
}

const hasUser = computed(() => {
  console.log("run has user")
  // return this.$store.getters['user/getUserData']()
  return false;
})

const vinyls = ref([{album: "123"}])
// export default {
// props: ["vinyls"],
// data() {
//   return {}
// },
// computed: {
//   hasUser() {
//     return this.$store.getters['user/getUserData']()
//   }
// },
// methods: {
//   handleDelete(id) {
//     console.log("handle delete", id);
//     this.$store.dispatch("vinyl/deleteVinyl", {vinylId: id, user: this.$store.getters["user/getUserData"]()})
//         .then(
//             () => {
//               this.$store.dispatch("vinyl/getVinyls")
//             }
//         )
//   },
//   handleEdit(id) {
//     this.$router.push({name: "editVinyl", params: {id}})
//   },
//   displayedText(text) {
//     return text
//         .split(" ")
//         .map(word => {
//       if(["a", "an", "at", "and"].includes(word.toLowerCase())) return word;
//       else if(word.replace(/\s+/, "").length === 0) return word
//       else {
//         return `${word[0].toUpperCase()}${word.slice(1)}`
//       }
//     })
//     .join(" ")
//   }
// }
// }
</script>

<template>
  <div class="VinylList">
    <ul class="VinylList__list">
      <li v-for="vinyl in vinyls" :key="vinyl.id" class="VinylList__listItem">
        <div>{{ displayedText(vinyl.artist) }}</div>
        <div>{{ displayedText(vinyl.album) }}</div>
        <div class="VinylList__itemControls" v-if="hasUser">
          <button type="button" class="VinylList__editButton" @click="handleEdit(vinyl.id)">Edit</button>
          <button type="button" class="VinylList__deleteButton" @click="handleDelete(vinyl.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.VinylList {
  max-width: 800px;
  margin: auto;
}

.VinylList__list {
  list-style: none;
  padding: 0;
}

.VinylList__listItem {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: thin solid hsla(160, 100%, 37%, 0.3);
}

.VinylList__listItem > .VinylList__itemControls {
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2;
}

.VinylList__editButton {
  background: none;
  border: none;
  color: #00bd7e;
  cursor: pointer;
  font-weight: bold;
}

.VinylList__deleteButton {
  background: none;
  border: none;
  color: #BD003F;
  cursor: pointer;
  font-weight: bold;
}

@media screen and (max-width: 480px) {
  .VinylList__listItem {
    flex-direction: column;
    gap: 0.5rem
  }
}
</style>