<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();
</script>
<template>
  <div id="login-v2-content" class="ember-application">
    <div id="ember180" class="ember-view">
      <div id="ember206" class="ember-view"></div>
      <div
        class="hca-login-content hca-twentysixteen hca-padding-top-50 hca-padding-bottom-50"
      >
        <div id="ember220" class="ember-view">
          <div class="container-large-desktop">
            <div
              class="row visible-sm visible-md visible-lg hca-margin-bottom-100"
            >
              <div class="col-sm-12">
                <div class="pull-left col-md-3">
                  <div class="text-center fade-first">
                    <img
                      src="/cpp/hca-ui/img/mho-full-color-retina-tm.png"
                      alt="myhealthone logo"
                      height="70px"
                    />
                  </div>
                </div>
                <div class="pull-right col-md-1">
                  <a
                    href="/mh1/public/mh1/overview"
                    aria-label="Back to MyHealthOne overview"
                    class="hca-landing--close-x hca-outline-wider"
                  >
                    <span class="hca-text--caption hca-text--cadet">
                      Close <i class="material-icons">clear</i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div class="row visible-xs hca-margin-bottom-50">
              <div class="col-sm-12">
                <div class="pull-left col-md-3">
                  <div class="text-center fade-first">
                    <img
                      src="/cpp/hca-ui/img/mho-full-color-retina-tm.png"
                      alt="myhealthone logo"
                      height="70px"
                    />
                  </div>
                </div>
                <div class="pull-right col-md-1"></div>
                <div class="pull-right col-md-1">
                  <a
                    href="/mh1/public/mh1/overview"
                    aria-label="Back to MyHealthOne overview"
                    class="hca-landing--close-x hca-outline-wider"
                  >
                    <span class="hca-text--caption hca-text--cadet">
                      Close <i class="material-icons">clear</i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-sm row-slider-container">
          <div class="row-slider">
            <div class="fade-third overlay-fade">
              <!---->
              <div class="row">
                <div class="col-sm-12 text-center">
                  <h1
                    id="title"
                    tabindex="0"
                    class="hca-text--headline hca-margin-bottom-15"
                  >
                    {{ props.title }}
                  </h1>
                </div>
              </div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>

      <!---->
      <div class="overlay-bg"></div>
    </div>
  </div>
</template>