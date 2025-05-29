<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: PContainer;
}>();

</script>

<template>
    <div v-for="child in container.children[0].children" 
        :key="child.id" >
        <DxContainer :container="child" />
    </div>
</template>
