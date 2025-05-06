<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: PContainer;
}>();

</script>

<template>
    <div style="display: grid; grid-template-columns: repeat(2, minmax(0px, 1fr)); gap: calc(0.5rem) calc(1rem);">
        <div v-for="child in container.children[0].children" 
            :key="child.id" >
            <DxContainer :container="child" />
        </div>
    </div>
</template>
