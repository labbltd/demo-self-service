import './styles.scss';

import { createApp } from 'vue';
import App from './app/App.vue';
import './app/ContainerMapping';

const app = createApp(App);

app.mount('#root');
