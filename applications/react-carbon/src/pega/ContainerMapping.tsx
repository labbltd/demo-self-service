import React from 'react';
import { DxReactAdapter } from '@labb/react-adapter';

// default controls
DxReactAdapter.registerMapping('Attachment', React.lazy(() => import('./controls/Attachment')));
DxReactAdapter.registerMapping('Checkbox', React.lazy(() => import('./controls/Checkbox')));
DxReactAdapter.registerMapping('Currency', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Date', React.lazy(() => import('./controls/Date')));
DxReactAdapter.registerMapping('DateTime', React.lazy(() => import('./controls/Date')));
DxReactAdapter.registerMapping('Decimal', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./controls/Dropdown')));
DxReactAdapter.registerMapping('Email', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Integer', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Percentage', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Phone', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('RadioButtons', React.lazy(() => import('./controls/RadioButtons')));
DxReactAdapter.registerMapping('TextInput', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Time', React.lazy(() => import('./controls/TextInput')));

// default containers
DxReactAdapter.registerMapping('Default', React.lazy(() => import('./containers/Default')));
DxReactAdapter.registerMapping('DefaultForm', React.lazy(() => import('./containers/DefaultForm')));
DxReactAdapter.registerMapping('FlowContainer', React.lazy(() => import('./containers/FlowContainer')));

// custom controls
// DxReactAdapter.registerMapping('Labb_dx_ButtonGroup', React.lazy(() => import('./controls/ButtonGroup')));
DxReactAdapter.registerMapping('Labb_dx_Address', React.lazy(() => import('./controls/AddressLookup')));
