<script setup lang="ts">
import { TokenInfo } from '@labb/constellation-core-types';
import { OAuth2Service } from '@labb/dx-engine';
import { PegaEntry } from '@labb/vue-adapter';
import { ref } from 'vue';

const infinityServer = 'http://localhost:3333/prweb';
const authPath = '/PRRestService/oauth2/v1';
const token = ref<TokenInfo | null>(null);

OAuth2Service.getTokenAuthorizationCode({
  appId: 'LabbCS',
  authorizationUrl: `${infinityServer}${authPath}/authorize`,
  accessTokenUrl: `${infinityServer}${authPath}/token`,
  revokeUrl: `${infinityServer}${authPath}/revoke`,
  redirectUrl: `http://localhost:4200/auth.html`,
  authService: 'custom',
  clientId: '13576784492731597416',
  pkce: true
}).then(t => {
  token.value = t;
})
</script>

<template>
    <PegaEntry v-if="token" 
      caseTypeID="ATHO-Insurance-Work-LeningBerekenen" 
      :infinityServer 
      :token />
</template>
