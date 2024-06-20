<script setup lang="ts">
import { ref } from 'vue'
import VueTags from '../src/components/VueTags'

const tags = ref([{
  name: 'test',
  id: '1',
}, {
  name: 'test2',
  id: '2',
}],
)
function setTags(fn) {
  tags.value = fn(tags.value)
}
function handleAddition(tag) {
  setTags((prevTags) => {
    return [...prevTags, tag]
  })
}
</script>

<template>
  <div flex justify-center m-auto h-100vh w-100vw mt-10>
    <div text-center>
      <h1>Vue Tags Example</h1>
      {{ tags }}
      <VueTags
        :tags="tags"
        :handle-addition="handleAddition"
      />
    </div>
  </div>
</template>
