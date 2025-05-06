<script setup lang="ts">
import { ref } from 'vue';
import { Attachment, FileStatus } from '@labb/dx-engine';

const props = defineProps<{
    container: Attachment;
}>();

const downloadedImage = ref<string>();

async function upload(e: Event): Promise<void> {
  await props.container.uploadFile(e);
}

async function remove(file: FileStatus): Promise<void> {
  await props.container.removeFile(file.id);
}

async function download(file: FileStatus): Promise<void> {
  downloadedImage.value = await props.container.downloadFile(file.id);
}
</script>

<template>
    <label :for="container.id">
        {{ container.config.label }}{{ container.config.required ? ' *' : '' }}
        <span v-if="container.config.helperText" :data-tooltip="container.config.helperText">?</span>
    </label>
    <input type="file"
        :id="container.id"
        :name="container.config.label" 
        :disabled="container.config.readOnly"
        :multiple="container.config.allowMultiple === 'true'"
        @change="upload" />
    {{ container.config.validatemessage }}
    <table v-if="container.files?.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
          <th>Uploaded</th>
          <th>Error</th>
          <th>Error Status</th>
          <th>Progress</th>
          <th>ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file of container.files" :key="file.id">
          <td>{{file.name}}</td>
          <td>{{file.size}}</td>
          <td>{{file.type}}</td>
          <td>{{file.uploaded}}</td>
          <td>{{file.error}}</td>
          <td>{{file.errorStatus}}</td>
          <td>{{file.progress}}</td>
          <td>{{file.id}}</td>
          <td>
            <button type="button" @click="remove(file)">delete</button>
            <button v-if="file.linked" @click="download(file)">download</button>
          </td>
        </tr>
      </tbody>
    </table>
    <img v-if="downloadedImage" width="100%" :src="'data:image/png;base64,' + downloadedImage" />
</template>