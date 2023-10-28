<script setup lang="ts">
import {ref, computed, defineProps} from 'vue'
import { useStore } from 'vuex';

const props = defineProps({"vinyls": Array});

const store = useStore()

// functions
function displayedText(text?: string) {
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
  return store.getters['user/getUserData']()
  // return false;
})

const vinyls = ref(props.vinyls);
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

.VinylList__listItem>* {
  flex: 3;
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