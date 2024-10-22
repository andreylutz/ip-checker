<template>
  <div>
    <h2>Детали IP: {{ ip }}</h2>
    <el-card>
      <div v-if="ipData">
        <p>Страна: {{ ipData.country }}</p>
        <p>Регион: {{ ipData.regionName }}</p>
        <p>Город: {{ ipData.city }}</p>
        <p>ISP: {{ ipData.isp }}</p>
        <p>Координаты: {{ ipData.lat }}, {{ ipData.lon }}</p>
      </div>
      <div v-else>Загрузка...</div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: ['ip'],
  setup(props) {
    const ipData = ref(null);

    onMounted(async () => {
      const response = await axios.get(`http://ip-api.com/json/${props.ip}`);
      ipData.value = response.data;
    });

    return {
      ipData,
    };
  },
};
</script>

<style scoped>
/* Стили для компонента */
</style>