<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
  container: PContainer;
}>();
</script>

<template>
  <DxContainer
    v-for="child in container.children"
    :key="child.id"
    :container="child"
  ></DxContainer>
</template>
