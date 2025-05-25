<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { ref } from 'vue';
import { DxVueAdapter } from './DxVueAdapter';
import XRay from './XRay.vue';

const props = defineProps<{
    container: PContainer<any>;
}>();
const counter = ref(0);
const isVisible = ref(props.container.isVisible());
props.container.updates.subscribe(() => {
    isVisible.value = props.container.isVisible();
    counter.value++;
});

const xray = ref(window.PCore.getDebugger().isXRayOn());
if (props.container.pconnect.getComponentName() === 'RootContainer') {
    window.PCore.getDebugger().onXRay(() => {
        if (window.PCore.getDebugger().isXRayOn() !== xray.value) {
            xray.value = window.PCore.getDebugger().isXRayOn();
        }
    });
}

const component = 
    DxVueAdapter.getComponent(props.container.pconnect.getComponentName()) || 
    DxVueAdapter.getComponent('default');
setTimeout(() => {
    counter.value++;
}, 0);
</script>

<template>
    <XRay v-if="xray && isVisible" :container="container">
        <component :key="counter" :is="component" :container="container"></component>
    </XRay>
    <component v-if="!xray && isVisible" :key="counter" :is="component" :container="container"></component>
</template>