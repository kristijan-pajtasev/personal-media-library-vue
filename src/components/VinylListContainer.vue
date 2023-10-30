<script setup lang="ts">
import VinylList from './VinylList.vue';
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const author = ref("");
const title = ref("");

onMounted(() => {
  store.dispatch('vinyl/getVinyls')
});

// computed
const vinyls = computed(() => {
  const vinyls = store.getters["vinyl/getAllVinyls"];

  if (!vinyls) return;

  // const _author = author
  // const _title = title
  const filteredVinyls = vinyls.filter(vinyl => {
    if (author.value.length > 0) {
      if (!vinyl.author.toLowerCase().includes(author.value.toLowerCase())) return false;
    }
    if (title.value.length > 0) {
      if (!vinyl.title.toLowerCase().includes(title.value.toLowerCase())) return false;
    }
    return true
  })
  return filteredVinyls
});

const loading = computed(() => {
  return store.getters['vinyl/isLoading']
});
</script>

<template>
  <div>
    <div v-if="loading">Loading data</div>
    <div v-else>
      <div v-if="!vinyls">No vinyls data</div>
      <div v-else>
        <div class="VinylListContainer__filterContainer">
          <input class="VinylListContainer__input" type="text" v-model="title" placeholder="Title"/>
          <input class="VinylListContainer__input" type="text" v-model="author" placeholder="Author"/>
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

.VinylListContainer__filterContainer > * {
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