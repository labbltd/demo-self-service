<script setup lang="ts">
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEntry } from '@labb/vue-adapter';
import { ref } from 'vue';

const token = ref<TokenInfo | null>(null);
const infinityServer = DemoBootstrap.getServerUrl();
const appID = DemoBootstrap.getAppId();
const action = DemoBootstrap.getAction();
const caseTypeID = action === 'createCase' ? DemoBootstrap.getCaseTypeId() : undefined;
const caseID = action === 'openCase' ? DemoBootstrap.getCaseId() : undefined
const pageID = action === 'openPage' ? DemoBootstrap.getPageId() : undefined;
const className = action === 'openPage' ? DemoBootstrap.getPageClass() : undefined;

DemoBootstrap.getToken().then(t => token.value = t);
function doneLoading() {
  const caseID = window.PCore.getStore().getState().data['app/primary_1']?.caseInfo.ID;
  if (caseID) {
    DemoBootstrap.setAction('openCase');
    DemoBootstrap.setCaseId(caseID);
  }
}
</script>

<template>
    <PegaEntry v-if="token"
        :appID
        :caseID
        :pageID
        :className
        :caseTypeID
        :infinityServer
        :token
        @loadingDone="doneLoading" />
</template>
