<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('book/getBooks')
  }
}
</script>

<template>
  <div>
    BookList
  </div>
</template>

<style scoped></style>