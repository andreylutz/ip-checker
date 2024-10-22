<template>
  <div class="details">
    <div class="details-back">
      <el-button 
        @click="goBack"
        type="info"
        class="back-button"
        circle
      >
        <
      </el-button>
      <span>Проверка IP ></span>
      <span class="details-ip">{{ props.ip }}</span>
    </div>

    <h2>{{ props.ip }}</h2>
      <table 
        v-if="ipData" 
        class="ip-table"
      >
        <tbody>
          <tr>
            <td>Query:</td>
            <td>{{ ipData.query }}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{{ ipData.country }}</td>
          </tr>
          <tr>
            <td>Country code:</td>
            <td>{{ ipData.countryCode }}</td>
          </tr>
          <tr>
            <td>Region:</td>
            <td>{{ ipData.regionName }}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{{ ipData.city }}</td>
          </tr>
          <tr>
            <td>Org:</td>
            <td>{{ ipData.org }}</td>
          </tr>
          <tr>
            <td>As:</td>
            <td>{{ ipData.as }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { type IIpData } from '../stores/ipStore'

const props = defineProps<{ ip: string }>()
const ipData = ref<IIpData | null>(null)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${props.ip}`)
    ipData.value = response.data
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
})

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.details-back {
  display: flex;
  align-items: center;
  margin: 1rem;

  span {
    margin-right: 1rem;
  }

  .details-ip {
    color: #303345;
  }
}

.back-button {
  margin-right: 1rem;
}

.ip-table {
  width: 50%;
  border-collapse: collapse;
  border: 1px solid #E1E8F1;
  border-radius: 1rem;
}

.ip-table td {
  padding: 1rem;
}

.ip-table tr:nth-child(even) {
  background-color: #F7F9FB;
}
</style>