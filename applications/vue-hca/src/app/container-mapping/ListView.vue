<script setup lang="ts">
    import { ListView } from '@labb/dx-engine';
    import { ref } from 'vue';
    import HcaPanel from '../../../design-system/HcaPanel.vue';

    const {container} = defineProps<{
        container: ListView;
    }>();
    const value = ref(0);
    const isCarePlanList = container.config.referenceList === 'D_CareplanList';
    function onSelect(plan: any){
        container.updateFieldValue(plan.CareLevel);
        container.triggerFieldChange(plan.CareLevel);
    }

    function selectRow(row: any, event?: Event) {
        container.selectRow(row, event && (event.target as HTMLInputElement).checked);
    }

    container.updates.subscribe(() => {
        setTimeout(() => {
            container.triggerFieldChange(container.config.value);
            value.value++;
        }, 500);
    });
</script>

<template>
    <div>
        <div className="grid" v-if="isCarePlanList">
            <HcaPanel v-for="plan in container.response" key={plan.CareLevel}
                @onSelect="onSelect(plan)"
                :selected="container.config.value === plan.CareLevel"
                :price="plan.MonthlyCost"
                :label="plan.pyLabel"
                :description="plan.pyDescription"
                :benefits="plan.Benefits"
                :level="plan.CareLevel" />
        </div>
        <table class="hca-table" :data-value="value" v-if="!isCarePlanList">
        <caption v-if="container.label">{{container.label}}</caption>
        <thead>
            <tr>
                <th v-if="container.singleSelectionMode || container.multiSelectionMode"></th>  
                <th v-for="col in container.fields" :key="col.config.name">{{col.config.label}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in container.updatedRefList" :key="row.id">
                <td v-if="container.singleSelectionMode">
                    <input type="radio" 
                    :name="container.id" 
                    :value="row[container.rowID]" 
                    :checked="row[container.rowID] === container.config.value" 
                    @change="selectRow(row)"/>
                </td>
                <td v-if="container.multiSelectionMode">
                    <input type="checkbox"
                        :name="container.id"
                        :value="row[container.rowID]"
                    :checked="row[container.rowID] === container.config.value"
                    @change="selectRow(row, $event)"/>
                </td>
                <td v-for="col in container.fields" :key="col.config.name" v-html="row[col.config.name] || '---'"></td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<style>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #BFE0F2;
  color: white;
}
</style>