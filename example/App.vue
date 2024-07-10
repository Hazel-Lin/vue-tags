<script setup lang="ts">
import { ref } from 'vue'
import VueTags from '../src/components/VueTags'
import type { Tag } from '../src/types'

const tags = ref<Tag[]>(
  [
    {
      id: '1',
      text: 'hazel',
    },
    {
      id: '2',
      text: 'lin',
    },
  ],
)
const labelField = 'text'
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
  tags.value[index][labelField] = value
}
function handleDrag(newTags: Tag[]) {
  tags.value = newTags
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
        :handle-change-tag="handleChangeTag"
        :handle-drag="handleDrag"
        :label-field="labelField"
        allow-addition-from-paste
        allow-drag
        editable
        placeholder="添加一个标签 🏷"
        clear-all
        clear-all-text="清空所有"
      />
    </div>
  </div>
</template>
