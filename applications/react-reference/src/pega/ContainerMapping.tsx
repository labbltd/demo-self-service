import { DxReactAdapter } from '@labb/react-adapter';
import * as React from 'react';

DxReactAdapter.registerMapping('Attachment', React.lazy(() => import('./containers/Attachment')));
DxReactAdapter.registerMapping('Checkbox', React.lazy(() => import('./containers/Checkbox')));
DxReactAdapter.registerMapping('Currency', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Date', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('DateTime', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Decimal', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Default', React.lazy(() => import('./containers/Default')));
DxReactAdapter.registerMapping('DefaultForm', React.lazy(() => import('./containers/DefaultForm')));
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./containers/Dropdown')));
DxReactAdapter.registerMapping('Email', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('FlowContainer', React.lazy(() => import('./containers/FlowContainer')));
DxReactAdapter.registerMapping('Integer', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Labb_Volksbank_WarningText', React.lazy(() => import('./containers/WarningText')));
DxReactAdapter.registerMapping('Percentage', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Phone', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('RadioButtons', React.lazy(() => import('./containers/RadioButtons')));
DxReactAdapter.registerMapping('TextInput', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('Time', React.lazy(() => import('./containers/TextInput')));
DxReactAdapter.registerMapping('AppShell', React.lazy(() => import('./containers/AppShell')))
DxReactAdapter.registerMapping('AppAnnouncement', React.lazy(() => import('./containers/AppAnnouncement')))
DxReactAdapter.registerMapping('Todo', React.lazy(() => import('./containers/Todo')))
DxReactAdapter.registerMapping('DetailsThreeColumns', React.lazy(() => import('./containers/DetailsThreeColumns')))
DxReactAdapter.registerMapping('SimpleTableManual', React.lazy(() => import('./containers/SimpleTableManual')))
DxReactAdapter.registerMapping('ListView', React.lazy(() => import('./containers/ListView')))
DxReactAdapter.registerMapping('ListPage', React.lazy(() => import('./containers/ListView')))