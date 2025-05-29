<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

defineProps<{
    container: PContainer;
}>();

</script>

<template>
    <label>{{ container.config.label }}{{ container.config.required ? ' *' : '' }}
    <textarea
      :value="container.config.value"
      (change)="container.updateFieldValue(getValue($event.target))"
      (blur)="container.triggerFieldChange(getValue($event.target))"
    ></textarea>
    {{ container.config.helperText }}
    {{ container.config.validatemessage }}
  </label>
</template>
