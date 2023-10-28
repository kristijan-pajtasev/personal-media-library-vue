<script lang="ts">
import VinylList from './VinylList.vue';
export default {
  components: {VinylList},
  data() {
    return {
      author: "",
      title: ""
    }
  },
  mounted() {
    this.$store.dispatch('vinyl/getVinyls')
  },
  computed: {
    vinyls() {
      const vinyls = this.$store.getters["vinyl/getAllVinyls"];

      if(!vinyls) return;

      const author = this.author
      const title = this.title
      const filteredVinyls = vinyls.filter(vinyl => {
        if(author.length > 0) {
          if(!vinyl.author.toLowerCase().includes(author.toLowerCase())) return false;
        }
        if(title.length > 0) {
          if(!vinyl.title.toLowerCase().includes(title.toLowerCase())) return false;
        }
        return true
      })
      return filteredVinyls
    },
    loading() {
      return this.$store.getters['vinyl/isLoading']
    }
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Loading data</div>
    <div v-else>
      <div v-if="!vinyls">No vinyls data</div>
      <div v-else>
        <div class="VinylListContainer__filterContainer">
          <input class="VinylListContainer__input" type="text" v-model="title" placeholder="Title" />
          <input class="VinylListContainer__input" type="text" v-model="author" placeholder="Author" />
        </div>
        <VinylList :vinyls="vinyls"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.VinylListContainer__filterContainer {
  margin: 1rem auto;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 480px;
}

.VinylListContainer__filterContainer>* {
  flex: 1;
}

.VinylListContainer__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.4rem;
  outline: none;
}

.VinylListContainer__input:focus {
  margin-bottom: 1rem;
  border: thin solid #00bd7e;
  box-shadow: #ccc 5px 5px 5px;
}

@media screen and (max-width: 480px) {
  .VinylListContainer__filterContainer {
    flex-direction: column;
    gap: 0.5rem
  }

  .VinylListContainer__input {
    margin-bottom: 0;
    width: 100%;
  }
}
</style>