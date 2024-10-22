<template>
  <div>
    <el-input
      type="textarea"
      placeholder="Введите IP адреса через запятую"
      v-model="ipInput"
      @input="onInputChange"
    />
    <el-button @click="checkIpAddresses">Проверить IP</el-button>
    <IpTable />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useIpStore } from '../stores/ipStore';
import axios from 'axios';
import IpTable from './IpTable.vue';

export default {
  components: { IpTable },
  setup() {
    const ipStore = useIpStore();
    const ipInput = ref('');

    const checkIpAddresses = async () => {
      const ips = ipInput.value.split(',').map(ip => ip.trim()).filter(Boolean);
      const responses = await Promise.all(
        ips.map(ip => axios.get(`http://ip-api.com/json/${ip}`))
      );
      ipStore.setIpList(responses.map(response => response.data));
    };

    const onInputChange = (value: string) => {
      ipInput.value = value;
    };

    return {
      ipInput,
      checkIpAddresses,
      onInputChange,
    };
  },
};
</script>