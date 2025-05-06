<script setup lang="ts">
import { CheckboxProps } from '@labb/constellation-core-types';
import { PContainer } from '@labb/dx-engine';

import HcaInput from '../../../design-system/HcaInput.vue';

const props = defineProps<{
  container: PContainer<CheckboxProps>;
}>();

function type(): string {
  switch (props.container.config.fieldMetadata?.type) {
    case 'Decimal':
      return 'number';
    case 'Integer':
      return 'number';
    case 'True-False':
      return 'checkbox';
    case 'Date Time':
      return 'datetime-local';
    case 'Date':
      return 'date';
    case 'TimeOfDay':
      return 'time';
    case 'Text':
      switch (props.container.config.fieldMetadata?.displayAs) {
        case 'pxEmail':
          return 'email';
        default:
          return 'text';
      }
    default:
      return 'text';
  }
}

function inputmode(): 'numeric' | 'text' {
  switch (props.container.config.fieldMetadata?.type) {
    case 'Decimal':
      return 'numeric';
    case 'Percentage':
      return 'numeric';
    case 'Integer':
      return 'numeric';
    default:
      return 'text';
  }
}

function step(): string | undefined {
  switch (props.container.config.fieldMetadata?.type) {
    case 'Decimal':
      return '0.01';
    case 'Percentage':
      return '0.01';
    case 'Integer':
      return '1';
    default:
      return undefined;
  }
}

function getValue(
  target: EventTarget | null
): string | number | undefined {
  const t: HTMLInputElement = target as HTMLInputElement;
  switch (type()) {
    case 'number':
      return t.value;
    case 'date':
      return t.valueAsDate?.toISOString().split('T')[0];
    case 'checkbox':
      return t.checked + '';
    default:
      return t.value;
  }
}

function change(event: Event) {
  props.container.updateFieldValue(getValue(event.target));
}

function blur(event: Event) {
  props.container.triggerFieldChange(getValue(event.target));
}
</script>

<template>
  <HcaInput
    :label="props.container.config.label || props.container.config.caption"
    :id="props.container.id"
    :helperText="props.container.config.helperText"
    :errorMessage="props.container.config.validatemessage"
    :name="props.container.config.label"
    :value="container.config.value"
    :readonly="container.config.readOnly"
    :type="type()"
    :inputmode="inputmode()"
    :step="step()"
    @change="change"
    @blur="blur"
  />
</template>