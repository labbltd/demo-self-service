<script setup lang="ts">
import { Multiselect } from '@labb/dx-engine';

const {container} = defineProps<{
    container: Multiselect;
}>();
function search(event: Event) {
    const value = (event.target as HTMLInputElement).value
    container.onSearchHandler(value);
}
</script>

<template>
    <label>
        {{container.config.label}}
        <input type="text" @blur="search($event)">
    </label>
    <label v-for="item in container.itemsTree" :key="item.id">
        <input type="checkbox" :checked="item.selected" 
            @change="container.toggleItem(item.id!)">{{item.primary}}
    </label>
</template>
