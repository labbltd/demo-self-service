<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import SignaturePad from 'signature_pad';
import { onMounted, ref, useTemplateRef } from 'vue';

const {container} = defineProps<{
    container: PContainer;
}>();
  const signature = ref<SignaturePad|null>(null);
  const hasValueChanged = ref(false);
  const info = ref('');
  const canvas = useTemplateRef('canvas');

  function onClear() {
    signature.value!.clear();
    hasValueChanged.value = false;
    info.value = '';
    container.updateFieldValue('');
  }

  function onAccept() {
    const newValue = canvas.value!.toDataURL('image/svg+xml');
    if (newValue) {
      container.updateFieldValue(newValue);
      hasValueChanged.value = false;
      info.value = 'Signature captured';
    }
  }

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.value!.width = canvas.value!.clientWidth * ratio;
    canvas.value!.height = canvas.value!.clientHeight * ratio;
    canvas.value!.getContext('2d')?.scale(ratio, ratio);
  }

  function onEndStroke() {
    hasValueChanged.value = true;
  }

  onMounted(() => {
    if (!canvas.value) return;
    const pad = new SignaturePad(canvas.value!, {
        penColor: '#056dae'
    });
    pad.addEventListener('endStroke', () => {
        onEndStroke();
    });
    pad.on();
    signature.value = pad;
    resizeCanvas();
  });

</script>

<template>
    <label :for="container.id">{{container.config.label}}</label>
    <img v-if="container.config.readOnly || container.config.value" :src="container.config.value">
    <template v-if="!container.config.readOnly">
      <canvas v-if="!container.config.value" style="width: 100%; height: 200px; border: 1px dashed" ref="canvas"></canvas>
      <button type="button" @click="onClear()">
        Clear
      </button>
      <button type="button" @click="onAccept()"
        v-if="!container.config.value"
        :disabled="!hasValueChanged">
        Accept
      </button>
    <div v-if="info">{{info}}</div>
    </template>
</template>
