<script setup lang="ts">
    import { DxContainer } from '@labb/vue-adapter';
    import HcaPanel from '../../../design-system/HcaPanel.vue';

    const {container} = defineProps<{
        container: any;
    }>();
    const isCarePlanList = container.config.viewName === 'CarePlanOptions_InEligibleCarePlans';
    function onSelect(){}
</script>

<template>
    <div>
        <h3 v-if="container.config.label">{{container.config.label}}</h3>
        <div className="grid" v-if="isCarePlanList">
            <HcaPanel v-for="plan in container.config.referenceList" key={plan.CareLevel}
                :selected="container.config.value === plan.CareLevel"
                :disabled="true"
                :price="plan.MonthlyCost"
                :label="plan.pyLabel"
                :description="plan.pyDescription"
                :benefits="plan.Benefits"
                :level="plan.CareLevel"
                @onSelect="onSelect" />
        </div>
        <table v-if="container.readOnlyMode && !isCarePlanList">
            <thead>
                <th v-for="col in container.processedFields" :key="col.config.name">{{col.config.label}}</th>
            </thead>
            <tbody>
                <tr v-for="row in container.rowData" :key="row.id">
                    <td v-for="col in container.processedFields" :key="col.config.name" v-html="row[col.config.name] || '---'"></td>
                </tr>
            </tbody>
        </table>
        <table v-if="container.editableMode && !isCarePlanList">
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
    </div>
</template>
