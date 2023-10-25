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
        <div>{{book.title}}</div>
        <div>{{ book.author }}</div>
      </li>
    </ul>
  </div>
</template>