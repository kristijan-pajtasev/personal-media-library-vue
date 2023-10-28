<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default {
  mounted() {
    const user = window.sessionStorage.getItem("UserData");
    if(user) {
      this.$store.dispatch("user/setUserData", JSON.parse(user));
    } else {
      console.log("not logged in")
    }
  },
  computed: {
    hasUser() {
      return this.$store.getters['user/getUserData']()
    }
  }
}
</script>

<template>
  <header>
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <div class="wrapper">
<!--      <HelloWorld msg="You did it!" />-->

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login" v-if="!hasUser">Log In</RouterLink>
<!--        <RouterLink to="/about">About</RouterLink>-->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-size: 1.3rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
