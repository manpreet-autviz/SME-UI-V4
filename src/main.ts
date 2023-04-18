import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/app.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import VueSweetalert2 from "vue-sweetalert2";
import Toast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const swalOptions = {
  confirmButtonColor: "#348f6a",
  cancelButtonColor: "#ff7674",
  timer: 2000
};
createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyC8yUgNjTb6tjXqZHnmg2p_4-vUMCNoRdM',
    },
  })
  .use(Toast)
  .use(store)
  .use(router).
  use(VueSweetalert2, swalOptions)
  .mount('#app');

  
