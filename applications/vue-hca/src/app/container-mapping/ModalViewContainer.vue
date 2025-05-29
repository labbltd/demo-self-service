<script setup lang="ts">
import { ActionButton } from '@labb/constellation-core-types';
import { ModalViewContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';
import { onMounted, ref, useTemplateRef } from 'vue';

const {container} = defineProps<{
    container: ModalViewContainer;
}>();
const dialogRef = useTemplateRef('dialog');
const loading = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(() => {
    container.updates.subscribe(() => {
      const dialog = dialogRef.value!;
      if (container.hasContainerItems()) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        if (dialog.open) {
          dialog.close();
        }
      }
    });
})

async function buttonClick(button: ActionButton): Promise<void> {
    try {
        errorMessage.value = null;
        loading.value = true;
        await container.buttonClick(button);
    } catch (e) {
        const error = e as { message: string; type: string };
        errorMessage.value = error?.message || error?.type || 'Error';
    }
    loading.value = false;
}
</script>

<template>
    <dialog ref="dialog">
      <h3>{{container.heading}}</h3>
        <DxContainer v-if="container.children.length > 0" v-for="child in container.children" :key="child.id" :container="child" />
        <button
            v-for="button of container.actionButtons.secondary"
            :key="button.actionID"
            :disabled="loading"
            @click="buttonClick(button)">
            {{ button.name }}
        </button>
        <button
            v-for="button of container.actionButtons.main"
            :key="button.actionID"
            :disabled="loading"
            @click="buttonClick(button)">
            {{ button.name }}
        </button>
    </dialog>
</template>
