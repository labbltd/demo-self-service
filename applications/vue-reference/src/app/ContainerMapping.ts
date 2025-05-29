import { DxVueAdapter } from "@labb/vue-adapter";
import Default from "./container-mapping/Default.vue";
import Dropdown from "./container-mapping/Dropdown.vue";
import FlowContainer from "./container-mapping/FlowContainer.vue";
import RadioButtons from "./container-mapping/RadioButtons.vue";
import TextInput from "./container-mapping/TextInput.vue";
import Attachment from "./container-mapping/Attachment.vue";
import Checkbox from "./container-mapping/Checkbox.vue";
import DefaultForm from "./container-mapping/DefaultForm.vue";
import CaseSummary from "./container-mapping/CaseSummary.vue";
import DetailsThreeColumn from "./container-mapping/DetailsThreeColumn.vue";
import DetailsTwoColumn from "./container-mapping/DetailsTwoColumn.vue";
import ListView from "./container-mapping/ListView.vue";
import ModalViewContainer from "./container-mapping/ModalViewContainer.vue";
import SimpleTableManual from "./container-mapping/SimpleTableManual.vue";
import View from "./container-mapping/View.vue";
import MultiSelect from "./container-mapping/MultiSelect.vue";
import TextArea from "./container-mapping/TextArea.vue";
import ActionableButton from "./container-mapping/ActionableButton.vue";
import MaskedInput from "./container-mapping/MaskedInput.vue";
import SignatureCapture from "./container-mapping/SignatureCapture.vue";

DxVueAdapter.registerMapping('default', Default);

// layouts
DxVueAdapter.registerMapping('CaseSummary', CaseSummary);
DxVueAdapter.registerMapping('DefaultForm', DefaultForm);
DxVueAdapter.registerMapping('DetailsThreeColumn', DetailsThreeColumn);
DxVueAdapter.registerMapping('DetailsTwoColumn', DetailsTwoColumn);
DxVueAdapter.registerMapping('FlowContainer', FlowContainer);
DxVueAdapter.registerMapping('ListPage', ListView);
DxVueAdapter.registerMapping('ListView', ListView);
DxVueAdapter.registerMapping('ModalViewContainer', ModalViewContainer);
DxVueAdapter.registerMapping('SimpleTableManual', SimpleTableManual);
DxVueAdapter.registerMapping('View', View);

// controls
DxVueAdapter.registerMapping('Attachment', Attachment);
DxVueAdapter.registerMapping('Checkbox', Checkbox);
DxVueAdapter.registerMapping('Currency', TextInput);
DxVueAdapter.registerMapping('Date', TextInput);
DxVueAdapter.registerMapping('DateTime', TextInput);
DxVueAdapter.registerMapping('Decimal', TextInput);
DxVueAdapter.registerMapping('Dropdown', Dropdown);
DxVueAdapter.registerMapping('Email', TextInput);
DxVueAdapter.registerMapping('Integer', TextInput);
DxVueAdapter.registerMapping('Location', Location);
DxVueAdapter.registerMapping('MultiSelect', MultiSelect);
DxVueAdapter.registerMapping('Percentage', TextInput);
DxVueAdapter.registerMapping('Phone', TextInput);
DxVueAdapter.registerMapping('RadioButtons', RadioButtons);
DxVueAdapter.registerMapping('RichText', TextArea);
DxVueAdapter.registerMapping('TextArea', TextArea);
DxVueAdapter.registerMapping('TextInput', TextInput);
DxVueAdapter.registerMapping('Time', TextInput);

// custom controls
DxVueAdapter.registerMapping('Pega_Extensions_ActionableButton', ActionableButton);
DxVueAdapter.registerMapping('Pega_Extensions_MaskedInput', MaskedInput);
DxVueAdapter.registerMapping('Pega_Extensions_SignatureCapture', SignatureCapture);