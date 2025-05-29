<script setup lang="ts">
import { SimpleTableManual } from '@labb/dx-engine';
import { DxContainer } from '@labb/vue-adapter';

defineProps<{
    container: SimpleTableManual;
}>();

</script>

<template>
    <h3 v-if="container.config.label">{{container.config.label}}</h3>
      <table v-if="container.readOnlyMode">
        <thead>
            <th v-for="col in container.processedFields" :key="col.config.name">{{col.config.label}}</th>
        </thead>
        <tbody>
            <tr v-for="row in container.rowData" :key="row.id">
                <td v-for="col in container.processedFields" :key="col.config.name" v-html="row[col.config.name] || '---'"></td>
            </tr>
        </tbody>
      </table>
      <table v-if="container.editableMode">
        <thead>
            <th v-for="col in container.fieldDefs" :key="col.name">{{col.label}}</th>
        </thead>
        <tbody>
            <tr v-for="(row, index) in container.elementsData" :key="index">
                <td v-for="col of row" :key="col.id">
                    <DxContainer :container="col" />
                </td>
            </tr>
        </tbody>
      </table>
</template>
