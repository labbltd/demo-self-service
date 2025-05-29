<script setup lang="ts">
import { ActionButton, Assignment } from '@labb/constellation-core-types';
import { FlowContainer } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';
import { ref } from 'vue';

const props = defineProps<{
    container: FlowContainer;
}>();
const todoAssignments = ref();

function click(button: ActionButton) {
    const promise = props.container.buttonClick(button);
    promise.catch(err => handleActionError(err))
}
function handleActionError(e: Error) {
    console.error(e);
    errorMessage.value = e.message || 'Error';
}

function openAssignment(assignment: Assignment) {
    props.container.openAssignment(assignment);
}

function updateAssignments(): void {
    todoAssignments.value = props.container.getTodoAssignments();
}

updateAssignments();
props.container.updates.subscribe(() => {
    updateAssignments();
});

const errorMessage = ref<string | null>(null);
</script>

<template>
    <form>
        <template v-if="!container.hasAssignment()">
            <div v-for="assignment in todoAssignments">
                <div>{{ assignment.processName }} > {{ assignment.name }}</div>
                <div>Assigned to {{ assignment.assigneeInfo?.name }}</div>
                <button type="button" @click="openAssignment(assignment)">Go</button>
            </div>
            <div v-if="todoAssignments.length === 0">
                <h2>Uw gegevens zijn goed ontvangen!</h2>
                <strong>Wij nemen zo spoedig mogelijk contact met u
                    op.</strong>
            </div>
        </template>
        <template v-if="container.hasAssignment()">
            <h2>
                {{ container.getActiveViewLabel() ||
                    container.getAssignmentName() }}
            </h2>
            <nav v-if="container.navigation">
                <ol>
                    <li v-for="step of container.navigation.steps">{{step.name}} [{{step.visited_status}}]</li>
                </ol>
            </nav>

            <fieldset>
                <DxContainer v-for="child in container.children" :key="child.id" :container="child" />
            </fieldset>

            <template v-if="container.actionButtons">
                <button v-for="button in container.actionButtons.secondary" 
                    type="button"
                    :key="button.jsAction" 
                    @click="click(button)">
                    {{ button.name }}
                </button>
                <button v-for="button in container.actionButtons.main"
                    type="button"
                    :key="button.jsAction"
                    @click="click(button)">
                    {{ button.name }}
                </button>
            </template>
        </template>
    </form>
</template>