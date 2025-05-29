<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';
import { ref } from 'vue';

const {container} = defineProps<{
    container: PContainer;
}>();
const val = ref(container.children.length);

const id = setInterval(() => {
    val.value = container.children.length;
    if(val.value > 0) {
        window.clearInterval(id);
    }
},100);
</script>

<template>
    <div :data-children="val">
        <DxContainer v-for="child in container.children"
        :key="child.id" :container="child" />
    </div>
</template>
