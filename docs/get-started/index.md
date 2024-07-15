---
title: 快速上手
---

# 快速上手

## 安装

vue3-tags 是一个基于 Vue3 的标签组件。

```bash
pnpm install vue3-tags
```

## Demo
[在线演示](https://vue-tags.vercel.app/)

## 使用

```vue
<script setup>
import { ref } from 'vue'
import VueTags from 'vue-tags'
import type { Tag } from 'vue-tags/types/vueTags'

const tags = ref<Tag[]>([
  { id: '1', name: 'Tag1' },
  { id: '2', name: 'Tag2' },
])

function handleAddition(tag: Tag) {
  tags.value.push(tag)
}

function handleDelete(index: number) {
  tags.value.splice(index, 1)
}

function handleClearAll() {
  tags.value = []
}

function handleChangeTag(index: number, newText: string) {
  tags.value[index].name = newText
}

function handleDrag(newTags: Tag[]) {
  tags.value = newTags
}
</script>

<template>
  <VueTags
    :tags="tags"
    :editable="true"
    :allow-drag="true"
    :read-only="false"
    @handle-addition="handleAddition"
    @handle-delete="handleDelete"
    @handle-clear-all="handleClearAll"
    @handle-change-tag="handleChangeTag"
    @handle-drag="handleDrag"
  />
</template>
```
