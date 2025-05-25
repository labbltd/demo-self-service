<script setup lang="ts">
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEntry } from '@labb/vue-adapter';
import { ref } from 'vue';

const token = ref<TokenInfo | null>(null);

const infinityServer = DemoBootstrap.getServerUrl();
const appID = DemoBootstrap.getAppId();
const caseTypeID = DemoBootstrap.getCaseTypeId();
DemoBootstrap.getToken().then(t => token.value = t);
</script>

<template>
    <PegaEntry v-if="token"
      :appID
      :caseTypeID
      :infinityServer 
      :token />
</template>
