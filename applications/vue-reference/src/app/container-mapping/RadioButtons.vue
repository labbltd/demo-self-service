<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

defineProps<{
    container: PContainer;
}>();

function getValue(target: EventTarget | null): string {
    return (target as HTMLInputElement).value;
}
</script>

<template>
    <fieldset>
        <legend>
            {{ container.config.label }}{{
                container.config.required ? ' *' : '' }}
        </legend>
        <template
            v-for="option in container.config.datasource"
            :key="option.key">
            <input type="radio"
            @change="container.updateFieldValue(getValue($event.target))"
            @blur="container.triggerFieldChange(getValue($event.target))"
            :id="container.id"
            :checked="container.config.value === option.key"
            :name="container.config.label"
            :value="option.value" />
            <label :for="container.id">{{ option.value }}</label>
            <br/>
        </template>
        {{ container.config.helperText }}
        {{ container.config.validatemessages }}
    </fieldset>
</template>