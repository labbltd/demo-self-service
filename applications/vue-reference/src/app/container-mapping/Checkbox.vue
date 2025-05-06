<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

const props = defineProps<{
    container: PContainer;
}>();

function getValue(
    target: EventTarget | null
): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    return t.checked;
}

function change(event: Event) {
    props.container.updateFieldValue(getValue(event.target))
}

function blur(event: Event) {
    props.container.triggerFieldChange(getValue(event.target))
}
</script>

<template>
    <input type="checkbox"
        :id="container.id"
        :name="container.config.label" 
        :value="container.config.value"
        :disabled="container.config.readOnly"
        @change="change" @blur="blur" />
    <label :for="container.id">
        {{ props.container.config.caption }}
        {{ container.config.required ? ' *' : '' }}
        <span v-if="container.config.helperText"
            :data-tooltip="container.config.helperText">?</span>
    </label>
    {{ container.config.validatemessage }}
</template>