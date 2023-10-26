<script>
export default {
  data() {
    return {}
  },
  methods: {
    goToBooks() {
      this.$router.push({name: "book"});
    },
    goToVinyl() {
      this.$router.push({name: "vinyl"});
    }
  }
}
</script>

<template>
  <div class="Home__menuContainer">
    <div @click="goToVinyl">
      <div>
        <img class="Home__image" src="/images/download.png" alt="viny icon image"/>
      </div>
      <div>
        <a class="Home__link" href="/vinyl">Vinyls</a>
      </div>
    </div>
    <div @click="goToBooks">
      <div>
        <img class="Home__image" src="/images/book.png" alt="book icon image"/>
      </div>
      <div>
        <a class="Home__link" href="/book">Books</a>
      </div>
    </div>
  </div>
</template>

<style>
.Home__menuContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 600px;
  gap: 1rem;
  margin: auto;
}

.Home__menuContainer>* {
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.Home__menuContainer>*:hover {
  background: #ccc;
}

.Home__image {
  width: 100%;
}

.Home__link {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>