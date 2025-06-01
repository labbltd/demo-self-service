<script setup lang="ts">
    import { ListView } from '@labb/dx-engine';
import { ref } from 'vue';
    const count = ref(0);

    const {container} = defineProps<{
        container: ListView;
    }>();

    console.log('fields',container.fields?.length)
    console.log('updatedRefList',container.updatedRefList?.length)

    setTimeout(() => {
        count.value++;
    },500);
    function selectRow(row: any, event?: Event) {
        container.selectRow(row, event && (event.target as HTMLInputElement).checked);
    }
</script>

<template>
    <table :data-count="count">
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
              <td v-for="col of container.fields" :key="col.config.name" v-html="row[col.config.name] || '---'"></td>
          </tr>
      </tbody>
    </table>
</template>
