<script setup>
import { ref } from 'vue'

import listItem from "./components/listItem.vue";

const posts = ref([
  { id: 1, title: 'Bulbasaur' },
  { id: 2, title: 'Ivysaur' },
  { id: 3, title: 'Venusaur' }
])
</script>

<template>

  <listItem
  	v-for="post in posts"
	  :key="post.id"
  	:title="post.title"
	></listItem>
</template>

<style scoped>

</style>
