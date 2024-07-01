<script setup lang="ts">
import { ref } from 'vue'
import VueTags from '../src/components/VueTags'
import type { Tag } from '../src/types'

const tags = ref<Tag[]>(
  [
    {
      name: '1',
      id: '1',
    },
    {
      name: '2',
      id: '2',
    },
    {
      name: '3',
      id: '3',
    },
    {
      name: '4',
      id: '4',
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
function handleChangeTag(index: number, value: string) {
  tags.value[index].name = value
}
function handleDrag(newTags: Tag[]) {
  tags.value = newTags
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
        :handle-delete="handleDelete"
        :handle-clear-all="handleDeleteAll"
        :handle-change-tag="handleChangeTag"
        :handle-drag="handleDrag"
        :max-tags="7"
        allow-addition-from-paste
        allow-drag
      />
    </div>
  </div>
</template>
