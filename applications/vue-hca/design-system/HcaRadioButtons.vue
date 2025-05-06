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
    <div class="radio">
      <label v-for="option in options" :key="option.key">
        <input
          type="radio"
          @change="(e) => $emit('change', e)"
          @blur="(e) => $emit('blur', e)"
          :checked="value === option.key"
          :name="label"
          :value="option.value"
        />{{ option.value }}
      </label>
    </div>
  </HcaFormField>
</template>