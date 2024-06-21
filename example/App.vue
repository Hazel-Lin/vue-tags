<script setup lang="ts">
import { ref } from 'vue'
import VueTags from '../src/components/VueTags'
import type { Tag } from '../src/types'

const tags = ref(
  [
    {
      name: 'test',
      id: '1',
    },
    {
      name: 'test2',
      id: '2',
    },
  ],
)
function handleAddition(tag: Tag) {
  tags.value = [...tags.value, tag]
}
function handleDelete(index: number) {
  tags.value = tags.value.filter((_, i) => i !== index)
}
function handleDeleteAll() {
  tags.value = []
}
</script>

<template>
  <div flex justify-center m-auto h-100vh w-100vw mt-10>
    <div text-center>
      <h1>Vue Tags Example</h1>
      <VueTags
        :tags="tags"
        :handle-addition="handleAddition"
        :handle-delete="handleDelete"
        :handle-clear-all="handleDeleteAll"
        allow-addition-from-paste
      />
    </div>
  </div>
</template>
