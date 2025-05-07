<script setup lang="ts">
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import PegaEntry from './container-mapping/PegaEntry.vue';
import { ref } from 'vue';

const token = ref<TokenInfo | null>(null);

const infinityServer = DemoBootstrap.getServerUrl();
const appId = DemoBootstrap.getAppId();
const caseTypeID = DemoBootstrap.getCaseTypeId();
DemoBootstrap.getToken().then(t => token.value = t);
</script>

<template>
    <PegaEntry v-if="token"
      :appId
      :caseTypeID
      :infinityServer 
      :token />
</template>
