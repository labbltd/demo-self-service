import { DxReactAdapter } from '@labb/react-adapter';
import React from 'react';

DxReactAdapter.registerMapping('Default', React.lazy(() => import('./containers/Default')));
DxReactAdapter.registerMapping('FlowContainer', React.lazy(() => import('./containers/FlowContainer')));
DxReactAdapter.registerMapping('Group', React.lazy(() => import('./containers/Group')));
DxReactAdapter.registerMapping('TextInput', React.lazy(() => import('./containers/Input')));
DxReactAdapter.registerMapping('RadioButtons', React.lazy(() => import('./containers/RadioButtons')));
DxReactAdapter.registerMapping('Dropdown', React.lazy(() => import('./containers/Dropdown')));
DxReactAdapter.registerMapping('Date', React.lazy(() => import('./containers/Date')));
DxReactAdapter.registerMapping('AutoComplete', React.lazy(() => import('./containers/AutoComplete')));
DxReactAdapter.registerMapping('DataReference', React.lazy(() => import('./containers/DataReference')));
DxReactAdapter.registerMapping('Region', React.lazy(() => import('./containers/Region')));
DxReactAdapter.registerMapping('DeferLoad', React.lazy(() => import('./containers/DeferLoad')));
