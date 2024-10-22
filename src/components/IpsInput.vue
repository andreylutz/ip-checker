<template>
  <div class="content">
    <h1>Проверка IP</h1>
    <div class="content__wrapper">
      <h4>Ваши IP</h4>
      <textarea
        class="content__input"
        placeholder="Введите IP адреса"
        v-model="ipInput"
        @input="onInputChange"
      />
      <el-button
        color="black"
        class="content__checked"
        @click="checkIpAddresses"
      >
        Начать проверку
      </el-button>
    </div>
    <div class="content__table">
      <IpTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIpStore } from '../stores/ipStore'
import axios from 'axios'
import IpTable from './IpTable.vue'

const ipStore = useIpStore()  
const ipInput = ref('')

const checkIpAddresses = async () => {
  const ips = ipInput.value.split('\n').map(ip => ip.trim()).filter(Boolean)
  try {
    const responses = await Promise.all(
      ips.map(ip => axios.get(`http://ip-api.com/json/${ip}`))
    )
    ipStore.setIpList(responses.map(response => response.data))
  } catch (error) {
    console.error('Ошибка при проверке IP адресов:', error)
  }
}

const onInputChange = (event: Event) => {
  ipInput.value = (event.target as HTMLTextAreaElement).value
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  padding: 5rem;
  width: 100%;
  box-sizing: border-box;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 700;
  }

  h4 {
    color: #6B6D80;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #F7F9FB;
    border-radius: 1rem;
    border: 1px solid #E1E8F1;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  &__input {
    width: 100%;
    height: 7rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #E1E8F1;
    padding: 0.5rem;
    box-sizing: border-box;
    resize: none;

    background: #ffff;
  }

  &__checked {
    margin-top: 1rem;
    align-self: flex-start;
    border-radius: 0.5rem;
  }

  &__table {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>