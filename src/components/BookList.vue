<script>
export default {
  props: ["books"],
  data() {
    return {
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{book.title}} - {{ book.author }}
      </li>
    </ul>
  </div>
</template>