<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Tag from '../src/components/Tag'

const tags = ref({
  name: 'test',
  id: '1',
})
</script>

<template>
  <div>
    <h1>Vue Tags Example</h1>
    <Tag
      :id="tags.id"
      :name="tags.name"
    />
  </div>
</template>
