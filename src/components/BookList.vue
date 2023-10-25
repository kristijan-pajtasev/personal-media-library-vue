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
      <li v-for="book in books">
        {{book.title}} - {{ book.author }}
      </li>
    </ul>
  </div>
</template>