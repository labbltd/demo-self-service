<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

const {container} = defineProps<{
    container: PContainer;
}>();
function performAction() {
    container.pconnect
        .getActionsApi()
        .openLocalAction(container.config.localAction, {
            caseID: container.config.value,
            containerName: 'modal',
            type: 'express'
        });
}
</script>

<template>
    <button type="button" @click="performAction()">{{container.config.label}}</button>
</template>
