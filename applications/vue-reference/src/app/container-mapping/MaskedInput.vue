<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { onMounted, useTemplateRef } from 'vue';
import IMask from 'imask';

const {container} = defineProps<{
    container: PContainer;
}>();
function getValue(target: EventTarget | null) {
    return (target as HTMLInputElement).value;
}
const input = useTemplateRef('masked-input');
onMounted(() => {
  const maskOptions = {
      mask: container.config.mask,
      definitions: {
        // defaults are '0', 'a', '*'
        // You can extend by adding other characters
        A: /[A-Z]/
      }
    }
    IMask(input.value!, maskOptions);
});
</script>

<template>
    <dt v-if="container.config.readOnly">{{ container.config.label }}</dt>
    <dd v-if="container.config.readOnly">{{container.config.value ?? '--'}}</dd>
    <label v-if="!container.config.readOnly" :for="container.id">
        {{ container.config.label }}{{ container.config.required ? ' *' : '' }} ({{ container.config.mask }})
        <span v-if="container.config.helperText" :data-tooltip="container.config.helperText">?</span>
    </label>
    <input v-if="!container.config.readOnly"
      ref="masked-input"
      :id="container.id"
      type="text"
      :value="container.config.value"
      :placeholder="container.config.placeholder"
      @change="container.updateFieldValue(getValue($event.target))"
      @blur="container.triggerFieldChange(getValue($event.target))"
    />
    <span v-if="container.config.validatemessage">{{ container.config.validatemessage }}</span>
</template>
