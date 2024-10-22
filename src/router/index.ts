import { createRouter, createWebHistory } from 'vue-router';
import IpInput from '../components/IpInput.vue';
import IpDetail from '../components/IpDetail.vue';

const routes = [
  { path: '/', component: IpInput },
  { path: '/ip/:ip', component: IpDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;