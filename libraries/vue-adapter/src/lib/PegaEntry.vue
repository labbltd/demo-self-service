<script setup lang="ts">
import { PCore, State, TokenInfo } from '@labb/constellation-core-types';
import { BootstrapService, PContainer } from '@labb/dx-engine';
import { computed, ref, ShallowRef } from 'vue';
import DxContainer from './DxContainer.vue';

declare global {
    interface Window {
        PCore: PCore<State>;
    }
}
const props = defineProps<{
    infinityServer: string;
    token: TokenInfo;
    appID?: string;
    portal?: string;
    caseTypeID?: string;
    pageID?: string;
    caseID?: string;
    assignmentID?: string;
    className?: string;
    deployUrl?: string;
    localeID?: string;
    startingFields?: object;
    headers?: { [key: string]: string };
}>();
const emit = defineEmits(['loadingDone']);

const container = ref() as ShallowRef<PContainer<any>>;
const loaded = ref(false);
const showRoot = computed(() => !!container.value && loaded.value);

init();

async function init() {
    try {
        container.value = await BootstrapService.init({
            appID: props.appID,
            deployUrl: props.deployUrl,
            headers: props.headers,
            infinityServer: props.infinityServer,
            portal: props.portal,
            token: props.token,
            localeID: props.localeID
        });
        const context = props.portal ? 'root' : 'app';
        if (props.caseTypeID) {
            await BootstrapService.createCase(props.caseTypeID, context, props.startingFields);
        } else if (props.pageID && props.className) {
            await BootstrapService.openPage(props.pageID, props.className, context);
        } else if (props.assignmentID) {
            await BootstrapService.openAssignment(props.assignmentID, context);
        } else if (props.caseID) {
            await BootstrapService.openCase(props.caseID, context);
        }
        emit('loadingDone', true);
    } catch(e) {
        emit('loadingDone', false);
    }
    loaded.value = true;
}
</script>

<template>
    <DxContainer v-if="showRoot && container" :container />
</template>