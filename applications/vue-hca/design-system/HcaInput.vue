<script lang="ts" setup>
import HcaFormField from './HcaFormField.vue';

defineProps<{
  label: string;
  id: string;
  value: string | number;
  errorMessage?: string;
  helperText?: string;
  readonly?: boolean;
  type?: string;
  inputmode?: 'numeric' | 'text';
  step?: string;
}>();
</script>
<template>
  <HcaFormField
    :label="label"
    :for="id"
    :helperText="helperText"
    :errorMessage="errorMessage"
  >
    <input
      :id="id"
      :name="label"
      :value="value"
      :readonly="readonly"
      :type="type"
      :inputmode="inputmode"
      :step="step"
      autocomplete="off"
      @change="(e) => $emit('change', e)"
      @blur="(e) => $emit('blur', e)"
      class="hca-form-field__input ember-text-field ember-view"
    />
  </HcaFormField>
</template>