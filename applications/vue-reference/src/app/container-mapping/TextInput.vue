<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

const props = defineProps<{
    container: PContainer;
}>();

function label(): string {
    return props.container.config.label || props.container.config.caption;
}

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

function inputmode(): 'numeric' | undefined {
    switch (props.container.config.fieldMetadata?.type) {
        case 'Decimal':
            return 'numeric';
        case 'Percentage':
            return 'numeric';
        case 'Integer':
            return 'numeric';
        default:
            return undefined;
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
): number | Date | boolean | string | null {
    const t: HTMLInputElement = target as HTMLInputElement;
    switch (type()) {
        case 'number':
            return t.valueAsNumber;
        case 'date':
            return t.valueAsDate;
        case 'checkbox':
            return t.checked;
        default:
            return t.value;
    }
}

function change(event: Event) {
    props.container.updateFieldValue(getValue(event.target))
}

function blur(event: Event) {
    props.container.triggerFieldChange(getValue(event.target))
}
</script>

<template>
    <label :for="container.id">
        {{ label() }}{{ container.config.required ? ' *' : '' }}
        <span v-if="container.config.helperText" :data-tooltip="container.config.helperText">?</span>
    </label>
    <input :type="type()"
        :id="container.id"
        :name="container.config.label" 
        :inputmode="inputmode()"
        :step="step()"
        :value="container.config.value"
        :disabled="container.config.readOnly"
        @change="change" @blur="blur" />
    {{ container.config.validatemessage }}
</template>