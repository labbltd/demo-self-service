import React from 'react';
import { DxReactAdapter } from '@labb/react-adapter';

DxReactAdapter.registerMapping('Address', React.lazy(() => import('./controls/Address')))
DxReactAdapter.registerMapping('AppAnnouncement', React.lazy(() => import('./containers/AppAnnouncement')))
DxReactAdapter.registerMapping('AppShell', React.lazy(() => import('./containers/AppShell')))
DxReactAdapter.registerMapping('Attachment', React.lazy(() => import('./controls/Attachment')));
DxReactAdapter.registerMapping('Checkbox', React.lazy(() => import('./controls/Checkbox')));
DxReactAdapter.registerMapping('Currency', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Date', React.lazy(() => import('./controls/Date')));
DxReactAdapter.registerMapping('DateTime', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Decimal', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Default', React.lazy(() => import('./containers/Default')));
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./controls/Dropdown')));
DxReactAdapter.registerMapping('Email', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('FlowContainer', React.lazy(() => import('./containers/FlowContainer')));
DxReactAdapter.registerMapping('Integer', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Labb_dx_ButtonGroup', React.lazy(() => import('./controls/RadioButtons')));
DxReactAdapter.registerMapping('Percentage', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Phone', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('RadioButtons', React.lazy(() => import('./controls/RadioButtons')));
DxReactAdapter.registerMapping('SimpleTableManual', React.lazy(() => import('./containers/SimpleTableManual')))
DxReactAdapter.registerMapping('ListView', React.lazy(() => import('./containers/ListView')))
DxReactAdapter.registerMapping('ListPage', React.lazy(() => import('./containers/ListView')))
DxReactAdapter.registerMapping('TextArea', React.lazy(() => import('./controls/TextArea')));
DxReactAdapter.registerMapping('TextInput', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Time', React.lazy(() => import('./controls/TextInput')));
DxReactAdapter.registerMapping('Todo', React.lazy(() => import('./containers/Todo')));
