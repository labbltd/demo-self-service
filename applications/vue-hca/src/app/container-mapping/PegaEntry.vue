<script setup lang="ts">
import { Bootstrap, PConnect, PCore, State, TokenInfo } from '@labb/constellation-core-types';
import { BootstrapService, PContainer, PContainerFactory } from '@labb/dx-engine';
import { ref, ShallowRef, computed } from 'vue';
import { DxContainer } from '@labb/vue-adapter';

declare global {
    interface Window {
        PCore: PCore<State>;
    }
}
const props = defineProps<{
    appId?: string;
    portal?: string;
    token: TokenInfo;
    caseTypeID?: string;
    pageID?: string;
    assignmentID?: string;
    className?: string;
    deployUrl?: string;
    infinityServer: string;
    startingFields?: object;
    headers?: { [key: string]: string };
}>();

// ShallowRef is necessary otherwise private properties are not seen
const container = ref() as ShallowRef<PContainer<any>>;
const loaded = ref(false);
const showRoot = computed(() => !!container.value && loaded.value);

init();

async function init() {
    const serverUrl = props.appId ? `${props.infinityServer}/app/${props.appId}` : props.infinityServer;
    const shell = await BootstrapService.constellationInit(serverUrl, props.deployUrl || '', props.token);
    const rootPConnect = await initScreen(shell, props.portal, props.headers);
    container.value = await PContainerFactory.create(rootPConnect.getComponentName(), rootPConnect);
    if (props.caseTypeID) {
        await window.PCore.getMashupApi().createCase(props.caseTypeID, 'app', { pageName: 'pyEmbedAssignment', startingFields: props.startingFields || {} });
    } else if (props.pageID && props.className) {
        await window.PCore.getMashupApi().openPage(props.pageID, props.className, 'app');
    } else if (props.assignmentID) {
        await window.PCore.getMashupApi().openAssignment(props.assignmentID, 'app');
    }
    loaded.value = true;
}

function initScreen(shell: Bootstrap, portal?: string, headers: { [key: string]: string } = {}): Promise<PConnect> {
    return new Promise<PConnect>((resolve) => {
        window.PCore.onPCoreReady((renderObj) => {
            window.PCore.registerComponentCreator((props) => ({ props }));
            window.PCore.getEnvironmentInfo().setLocale('en-US');
            Object.keys(headers).forEach(key => {
                window.PCore.getRestClient().getHeaderProcessor().registerHeader(key, headers[key]);
            });
            resolve(renderObj.props.getPConnect())
        });
        if (portal) {
            shell.loadPortal('dx-pega-embed', portal, []);
        } else {
            shell.loadMashup('dx-pega-embed', false);
        }
    });
}
</script>

<template>
    <DxContainer v-if="showRoot" :container />
</template>