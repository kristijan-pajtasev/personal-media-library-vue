<script>
export default {
  data() {
    return {
      title: "",
      author: "",
    }
  },
  mounted() {
    console.log("create book component")
  },
  methods: {}
}
</script>

<template>
  <div>
    <div>add book</div>
    <form>
      <div>
        <input v-model="title" placeholder="title" type="text"/>
      </div>
      <div>
        <input v-model="author" placeholder="author" type="text"/>
      </div>
      <div>
        <button>add book</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>