import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from "./router";
import './assets/main.css'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

const appInstance = createApp(App);
appInstance.use(Antd);
appInstance.use(router);
appInstance.mount("#app");