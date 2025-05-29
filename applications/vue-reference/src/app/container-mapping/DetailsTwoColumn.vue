<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: PContainer;
}>();

</script>

<template>
    <div class="two-column">
        <div>
            <dl>
                <DxContainer v-for="child in container.children[0].children"
                    :key="child.id" :container="child" />
            </dl>
        </div>
        <div>
            <dl>
                <DxContainer v-for="child in container.children[1].children"
                :key="child.id" :container="child" />
            </dl>
        </div>
    </div>
</template>

<style>
    .two-column {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: calc(1rem);
    }
</style>