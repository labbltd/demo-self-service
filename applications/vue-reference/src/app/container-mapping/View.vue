<script setup lang="ts">
import { View } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: View;
}>();

</script>

<template>
    <div v-for="message in container.config.httpMessages" :key="message.message">
        {{message.type}}: {{message.message}}
    </div>
    <h2 v-if="container.config.showHeading">{{container.config.heading}}</h2>
    <span v-if="container.config.showLabel">{{container.config.label}}</span>
    <div v-if="container.config.instructions && container.config.instructions !== 'none'" v-html="container.config.instructions"></div>
    <div class="body">
        <DxContainer v-for="child in container.children"
        :key="child.id" :container="child" />
    </div>
</template>
