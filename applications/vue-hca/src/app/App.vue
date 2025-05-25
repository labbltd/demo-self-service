<script setup lang="ts">
import { ref } from 'vue';

import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import { PegaEntry } from '@labb/vue-adapter';
import PageTemplate from '../../design-system/PageTemplate.vue';

const token = ref<TokenInfo | null>(null);
const infinityServer = DemoBootstrap.getServerUrl();
const appId = DemoBootstrap.getAppId();
const caseTypeID = DemoBootstrap.getCaseTypeId();
DemoBootstrap.getToken().then(t => token.value = t);
</script>

<template>
  <PageTemplate title="Onboarding">
    <div class="row">
      <div class="col-md-12 hca-margin-bottom-25">
        <div
          class="hca-flex hca-flex--justify-center hca-padding-10 hca-create-account__helper-text--background"
        >
          <small
            class="text-center hca-create-account__helper-text--small hca-text--center"
          >
            <small class="black-text strong">
              If you are creating an account for someone other than yourself,
            </small>
            please call MyHealthONE portal support at
            <a href="tel:(855) 422-6625" class="hca-outline-wider"
              >(855) 422-6625</a
            >.</small
          >
        </div>
        <small
          class="hca-margin-top-30 text-center disp-block hca-create-account__helper-text--medium"
          >Please be sure to use the same information you provided at
          registration.</small
        >
      </div>
    </div>
    <div class="row pega">
      <PegaEntry
        v-if="token"
        :appId
        :caseTypeID
        :infinityServer
        :token
      />
    </div>
    <div class="row">
      <div class="col-sm-12 hca-margin-top-40">
        <div class="text-center">
          <p class="bold-text hca-padding-vertical--10">
            Already have an account?
          </p>
          <a
            href="#"
            tabindex="0"
            role="link"
            class="hca-button hca-button--outline hca-button--max-width-contain bold-text text-center hca-text--evening"
            data-ember-action=""
            data-ember-action-330="330"
            >Log In</a
          >
        </div>
        <div class="text-center hca-margin-top-40 hidden-xs">
          <a
            href="http://itunes.apple.com/app/id1493014954"
            target="_blank"
            title="Download the MyHealthONE mobile app from the iOS app store"
            class="js-download-ios"
          >
            <img
              src="/cpp/hca-ui/img/app-store-badge.png"
              width="115px"
              alt="iOS app store button image"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.hcahealthcare.mhom"
            target="_blank"
            title="Download the MyHealthONE mobile app from the Google Play store"
            class="js-download-android hca-margin-left-15"
          >
            <img
              src="/cpp/hca-ui/img/google-play-badge.png"
              width="115px"
              alt="Google Play app store button image"
            />
          </a>
        </div>
        <div class="text-center hca-margin-top-30 visible-xs">
          <a
            href="http://itunes.apple.com/app/id1493014954"
            target="_blank"
            title="Download the MyHealthONE mobile app from the iOS app store"
            class="js-download-ios"
          >
            <img
              src="/cpp/hca-ui/img/app-store-badge.png"
              width="135px"
              alt="iOS app store button image"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.hcahealthcare.mhom"
            target="_blank"
            title="Download the MyHealthONE mobile app from the Google Play store"
            class="js-download-android hca-margin-left-15"
          >
            <img
              src="/cpp/hca-ui/img/google-play-badge.png"
              width="135px"
              alt="Google Play app store button image"
            />
          </a>
        </div>
      </div>
    </div>
  </PageTemplate>
</template>
