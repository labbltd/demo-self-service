import { DxVueAdapter } from "@labb/vue-adapter";

import DxDefault from "./container-mapping/DxDefault.vue";
import DxDropdown from "./container-mapping/DxDropdown.vue";
import DxFlowContainer from "./container-mapping/DxFlowContainer.vue";
import DxRadioButtons from "./container-mapping/DxRadioButtons.vue";
import DxTextInput from "./container-mapping/DxTextInput.vue";

DxVueAdapter.registerMapping('default', DxDefault);
DxVueAdapter.registerMapping('FlowContainer', DxFlowContainer);
DxVueAdapter.registerMapping('Currency', DxTextInput);
DxVueAdapter.registerMapping('TextInput', DxTextInput);
DxVueAdapter.registerMapping('Phone', DxTextInput);
DxVueAdapter.registerMapping('Email', DxTextInput);
DxVueAdapter.registerMapping('Date', DxTextInput);
DxVueAdapter.registerMapping('Dropdown', DxDropdown);
DxVueAdapter.registerMapping('RadioButtons', DxRadioButtons);
