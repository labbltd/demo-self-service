<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import HcaInput from '../../../design-system/HcaInput.vue';

const {container} = defineProps<{
    container: PContainer;
}>();

function label(): string {
    return container.config.label || container.config.caption;
}

function type(): string {
    switch (container.config.fieldMetadata?.type) {
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
            switch (container.config.fieldMetadata?.displayAs) {
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
    switch (container.config.fieldMetadata?.type) {
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
    switch (container.config.fieldMetadata?.type) {
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
            return t.value;
        case 'checkbox':
            return t.checked;
        default:
            return t.value;
    }
}

function change(event: Event) {
    if(type() !== 'date') {
        container.updateFieldValue(getValue(event.target))
    }
}

function blur(event: Event) {
    if(type() === 'date') {
        container.updateFieldValue(getValue(event.target))
    }
    container.triggerFieldChange(getValue(event.target))
}
</script>

<template>
    <div>
        <template v-if="container.config.readOnly">
            <dt>{{ label() }}</dt>
            <dd>{{ container.config.value }}</dd>
        </template>
        <HcaInput v-if="!container.config.readOnly"
            :label="container.config.label || container.config.caption"
            :id="container.id"
            :helperText="container.config.helperText"
            :errorMessage="container.config.validatemessage"
            :name="container.config.label"
            :value="container.config.value"
            :readonly="container.config.readOnly"
            :type="type()"
            :inputmode="inputmode()"
            :step="step()"
            @change="change"
            @blur="blur"
        />
    </div>
</template>