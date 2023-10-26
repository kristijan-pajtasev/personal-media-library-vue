<template>
  <div class="LogIn">
    <h2 class="LogIn__title">Log In</h2>
    <form @submit.prevent="submitHandler">
      <div>
        <input class="LogIn__input" type="text" placeholder="email" v-model="email"/>
      </div>
      <div>
        <input class="LogIn__input" type="text" placeholder="password" v-model="password"/>
      </div>
      <button class="LogIn__button">Log In</button>
    </form>
  </div>
</template>

<script>
export default {
  // type inference enabled
  props: {},
  mounted() {
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {},
  methods: {
    submitHandler() {
      const router = this.$router;
      this.$store.dispatch("user/logIn", {
        email: this.email,
        password: this.password
      }).then(
          () => {
            router.push({name: "home"})
          }
      )
    }
  }
}
</script>

<style scoped>
.LogIn {
  max-width: 600px;
  margin: 1rem auto;
}

.LogIn__title {
  color: #00bd7e;
  margin-bottom: 1rem;
  text-align: center;
}

.LogIn__input {
  margin-bottom: 1rem;
  border: thin solid #ccc;
  border-radius: 0.3rem;
  padding: 0.4rem 0.4rem;
  outline: none;
  width: 100%;
}

.LogIn__input:focus {
  margin-bottom: 1rem;
  border: thin solid #00bd7e;
  box-shadow: #ccc 5px 5px 5px;
}

.LogIn__button {
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
</style>