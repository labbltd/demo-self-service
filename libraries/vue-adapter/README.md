# Summary

This package provides a connection between the Pega infinity server and the Vue framework.

# Installation

```bash
npm install @labb/vue-adapter
```

Versioning is based on <major.minor.patch>, where:

- major: the version of Pega that is used
- minor: the version of Vue that is used
- patch: the version of updates to the library itself

The library works together with the constellation core and the DX Engine. Make sure the correct versions of these libraries are installed as well.

```bash
npm install @pega/constellationjs
npm install @labb/dx-engine
```

# Features

## DX Components

This library adds functionality to build, register and dynamically inject DX Components in the DOM tree using Vue technology.

### Build

DX Components can be build by defining a single `container` property of type `PContainer` where all of the interaction with Pega will be available. See the `PContainer` class in the DX Engine for more information.

```Vue
<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';

const props = defineProps<{
    container: PContainer;
}>();
</script>
<template>
    <label>
        {{ container.config.label }}
        ...
        {{ container.config.helperText }}
        {{ container.config.validatemessage }}
    </label>
</template>
```

### Registration

DX Components can be provided using the `DxVueAdapter` registry. This registry holds an array of DX Vue Components, where each component is registered using a unique key. Note how the same DX Component implementation can be reused using for different keys. This can be especially useful when implementations are not too different (e.g. TextInput vs Email DX Components).

```TypeScript
DxVueAdapter.registerMapping(<key>, <DX Vue Component>);
```

### Dynamic injection

When a DX Component has children of it's own (e.g. layout components), then these can be injected in the DOM tree using the provided `DxContainer` component. This component expects a `PContainer` as the `container` property and will instantiate and insert the corresponding DX Vue Component. See the `DxContainer` component for details.

```Vue
<template>
    <DxContainer v-for="child in container.children"
        :key="child.id" :container="child" />
</template>
```

## X-Ray

Each injected component can be inspected in the browser using pega's XRay feature. Toggling XRay allows to inspect the metadata and state of each component. When XRay mode is enabled, the DX components can be interacted with using the console of the browser developer tools.

You can launch the XRay tool by entering `PCore.getDebugger().toggleXRay(true)` into the browser console. To disable XRay, enter `PCore.getDebugger().toggleXRay(false)`.

## Pega Entry

Bootstrapping a Pega application requires among others loading the constellation core into the browser, authentication with the Pega server and initializing the root container. After the Pega application has been bootstrapped, the various Mashup API's. To simplify this process, a `PegaEntryComponent` is available which has a standard implementation for all these steps. An easy way to e.g. start a new case type using this entry component is as follows:

```Vue
<script setup lang="ts">
const infinityServer = 'http://localhost:3333/prweb';
const token = ref<TokenInfo>(null);
OAuth2Service.getTokenCredentials(...).then(t => {
  token.value = t;
})
</script>

<template>
  <PegaEntry v-if="token"
    caseTypeID="MY-Case-Type-Id"
    :infinityServer :token />
</template>
```

For authentication options, see more details at the `AuthenticationService`.

## Example implementation

For an example usage of this library, see the [Vue reference implementation](https://github.com/labbltd/constellation-vue-reference).
