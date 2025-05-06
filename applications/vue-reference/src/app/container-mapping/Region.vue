<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: PContainer;
}>();

</script>

<template>
    <p v-if="container.config.label && container.config.showLabel">{{container.config.label}}</p>
    <DxContainer v-for="child in container.children"
        :key="child.id" :container="child" />
</template>
