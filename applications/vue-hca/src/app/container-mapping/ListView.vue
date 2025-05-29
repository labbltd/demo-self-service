<script setup lang="ts">
    import { ListView } from '@labb/dx-engine';

    const props = defineProps<{
        container: ListView;
    }>();

    function  selectRow(row: any, event?: Event) {
        props.container.selectRow(row, event && (event.target as HTMLInputElement).checked);
    }
</script>

<template>
    <table>
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
