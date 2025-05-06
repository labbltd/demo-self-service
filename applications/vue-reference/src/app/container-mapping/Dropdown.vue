<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

const props = defineProps<{
    container: PContainer;
}>();

function change(event: Event) {
    props.container.updateFieldValue(getValue(event.target))
}

function blur(event: Event) {
    props.container.triggerFieldChange(getValue(event.target))
}

function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
}
</script>

<template>
    <label :for="container.id">
        {{ container.config.label }}{{container.config.required ? ' *' : '' }}
    </label>
    <select 
        :id="container.id"
        :name="container.config.label"
        :disabled="container.config.readOnly"
        @change="change"
        @blur="blur">
        <option disabled selected value="{undefined}">
            -- select an option --
        </option>
        <option
            v-for="option in container.config.datasource"
            :key="option.key" :value="option.key"
            :selected="option.key === container.config.value">
            {{ option.value }}
        </option>
    </select>
    {{ container.config.helperText }}
    {{ container.config.validatemessage }}
</template>
