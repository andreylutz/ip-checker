import { createRouter, createWebHistory } from 'vue-router'
import IpsInput from '../components/IpsInput.vue'
import IpDetail from '../components/IpDetail.vue'

const routes = [
  { path: '/', component: IpsInput },
  { path: '/ip/:ip', component: IpDetail, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router