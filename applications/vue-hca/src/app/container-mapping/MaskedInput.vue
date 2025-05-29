<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { onMounted, useTemplateRef } from 'vue';
import IMask from 'imask';
import HcaFormField from '../../../design-system/HcaFormField.vue'

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
    <HcaFormField
    v-if="!container.config.readOnly"
    :label="container.config.label"
    :for="container.id"
    :helperText="container.config.helperText"
    :errorMessage="container.config.validatemessage"
  >
    <input ref="masked-input"
      :id="container.id"
      :name="container.config.label"
      :value="container.config.value"
      type="text"
      autocomplete="off"
      @change="container.updateFieldValue(getValue($event.target))"
      @blur="container.triggerFieldChange(getValue($event.target))"
      class="hca-form-field__input ember-text-field ember-view"
    />
  </HcaFormField>
</template>
