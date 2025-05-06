<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps<{
  label: string;
  for: string;
  errorMessage?: string;
  helperText?: string;
}>();
const isHovered = ref<boolean>(false);
</script>

<template>
  <div
    class="hca-form-field"
    :class="{ 'hca-form-field--has-error': props.errorMessage }"
  >
    <label :for="props.for" class="hca-form-field__label">
      {{ props.label }}
      <i
        v-if="props.helperText"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        tabindex="0"
        class="material-icons hca-margin-0 md-18 hca-padding-left-5 hca-text--cerulean hca__cursor--pointer ember-view"
        :class="{ active: isHovered }"
      >
        {{ isHovered ? 'info' : 'info_outline' }}
      </i>
      <div
        v-if="props.helperText && isHovered"
        class="tooltip hca-margin-top-5 hca-margin-left-35 fade top in"
        role="tooltip"
      >
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner" v-html="props.helperText"></div>
      </div>
    </label>
    <slot></slot>
    <i class="material-icons hca-form-field__feedback-icon">error</i>
    <small v-if="props.errorMessage" class="hca-form-field__helper-text">
      {{ props.errorMessage }}
    </small>
  </div>
</template>