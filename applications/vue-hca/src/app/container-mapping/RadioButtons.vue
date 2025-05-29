<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

import HcaRadioButtons from '../../../design-system/HcaRadioButtons.vue';
import { PicklistProps } from '@labb/constellation-core-types';

const props = defineProps<{
  container: PContainer<PicklistProps>;
}>();

function getValue(target: EventTarget | null): string {
  return (target as HTMLInputElement).value;
}

function change(event: Event) {
  props.container.updateFieldValue(getValue(event.target));
}

function blur(event: Event) {
  props.container.triggerFieldChange(getValue(event.target));
}
</script>

<template>
  <HcaRadioButtons
    :label="props.container.config.label"
    :id="props.container.id"
    :value="props.container.config.value"
    :helperText="props.container.config.helperText"
    :errorMessage="props.container.config.validatemessage"
    :options="props.container.config.datasource"
    @change="change"
    @blur="blur"
  ></HcaRadioButtons>
</template>