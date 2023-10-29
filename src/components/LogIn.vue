<template>
  <div class="LogIn">
    <h2 class="LogIn__title">Log In</h2>
    <form @submit.prevent="submitHandler">
      <div>
        <input class="LogIn__input" type="text" placeholder="Email" v-model="email"/>
      </div>
      <div>
        <input class="LogIn__input" type="password" placeholder="Password" v-model="password"/>
      </div>
      <button class="LogIn__button">Log In</button>
      <div class="LogIn__error" v-if="!!error">{{error}}</div>
    </form>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue'
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

// functions
function submitHandler() {
  error.value = "";
  store.dispatch("user/logIn", {
    email: email.value,
    password: password.value
  }).then(
      () => {
        router.push({name: "home"})
      },
      (errorResponse: {type: string}) => {
        console.log(errorResponse);
        error.value = "Error logging in";
      }
  )
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

.LogIn__error {
  color: #bd003f;
  margin-top: 0.5rem;
  text-align: center;
}
</style>