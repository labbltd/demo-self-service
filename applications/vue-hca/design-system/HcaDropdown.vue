<script lang="ts" setup>
import HcaFormField from './HcaFormField.vue';

defineProps<{
  label: string;
  id: string;
  value: string;
  options: { key: string; value: string }[];
  errorMessage?: string;
  helperText?: string;
}>();
</script>
<template>
  <HcaFormField
    :label="label"
    :for="id"
    :helperText="helperText"
    :errorMessage="errorMessage"
  >
    <select
      class="hca-form-field__input"
      @change="(e) => $emit('change', e)"
      @blur="(e) => $emit('blur', e)"
    >
      <option disabled selected value="{undefined}">
        -- select an option --
      </option>
      <option
        v-for="option in options"
        :key="option.key"
        :value="option.key"
        :selected="option.key === value"
      >
        {{ option.value }}
      </option>
    </select>
  </HcaFormField>
</template>