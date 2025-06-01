<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import HcaDropdown from '../../../design-system/HcaDropdown.vue';
import { PicklistProps } from '@labb/constellation-core-types';

const props = defineProps<{
  container: PContainer<PicklistProps>;
}>();

function change(event: Event) {
  props.container.updateFieldValue(getValue(event.target));
}

function blur(event: Event) {
  props.container.triggerFieldChange(getValue(event.target));
}

function getValue(target: EventTarget | null): string {
  return (target as HTMLInputElement).value;
}
</script>

<template>
  <div>
    <template v-if="container.config.readOnly">
      <dt>{{ container.config.label }}</dt>
      <dd>{{ container.config.value }}</dd>
    </template>
    <HcaDropdown
      :label="props.container.config.label"
      :id="props.container.id"
      :value="props.container.config.value"
      :helperText="props.container.config.helperText"
      :errorMessage="props.container.config.validatemessage"
      :options="props.container.config.datasource"
      @change="change"
      @blur="blur"
      />
  </div>
</template>
