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
  promise.catch((err) => handleActionError(err));
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
  <div>
    <template v-if="!container.hasAssignment()">
      <div v-for="assignment in todoAssignments" v-bind:key="assignment.ID">
        <div>{{ assignment.processName }} > {{ assignment.name }}</div>
        <div>Assigned to {{ assignment.assigneeInfo?.name }}</div>
        <button type="button" @click="openAssignment(assignment)">Go</button>
      </div>
      <div v-if="todoAssignments.length === 0">
        <h2 class="hca-text--headline hca-margin-bottom-15 text-center">
          Your request has been received!
        </h2>
        <p class="text-center">We will contact you as soon as possible.</p>
      </div>
    </template>
    <template v-if="container.hasAssignment()">
      <h2 class="hca-text--headline hca-margin-bottom-15">
        {{ container.getActiveViewLabel() || container.getAssignmentName() }}
      </h2>

      <div class="flex">
        <DxContainer
          v-for="child in container.children"
          :key="child.id"
          :container="child"
        />
      </div>

      <template v-if="container.actionButtons">
        <button
          class="hca-button hca-button--secondary hca-button--raised"
          v-for="button in container.actionButtons.secondary"
          :key="button.jsAction"
          @click="click(button)"
        >
          {{ button.name }}
        </button>
        <button
          class="hca-button hca-button--primary hca-button--raised pull-right"
          v-for="button in container.actionButtons.main"
          :key="button.jsAction"
          @click="click(button)"
        >
          {{ button.name }}
        </button>
      </template>
    </template>
  </div>
</template>