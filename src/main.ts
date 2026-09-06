import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './App.vue';

// Import TDesign component styling and custom utilities
import 'tdesign-vue-next/es/style/index.css';
import './index.css';

const app = createApp(App);
app.use(TDesign);
app.mount('#root');
