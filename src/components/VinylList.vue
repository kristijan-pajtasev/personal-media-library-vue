<script>
export default {
  props: ["vinyls"],
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
      console.log("handle delete", id);
      this.$store.dispatch("vinyl/deleteVinyl", {vinylId: id, user: this.$store.getters["user/getUserData"]()})
          .then(
              () => {
                this.$store.dispatch("vinyl/getVinyls")
              }
          )
    },
    displayedText(text) {
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
  <div class="VinylList">
    <ul class="VinylList__list">
      <li v-for="vinyl in vinyls" :key="vinyl.id" class="VinylList__listItem">
        <div>{{ displayedText(vinyl.artist) }}</div>
        <div>{{ displayedText(vinyl.album) }}</div>
        <div class="VinylList__itemControls" v-if="hasUser">
          <button type="button" @click="handleDelete(vinyl.id)">Delete</button>
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
  border-bottom: thin solid hsla(160, 100%, 37%, 1)
}

.VinylList__listItem > * {
  flex: 3;
}

.VinylList__listItem>.VinylList__itemControls {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 2;
}
</style>