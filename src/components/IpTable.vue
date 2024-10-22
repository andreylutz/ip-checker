<template>
  <div>
    <h2>Результаты</h2>
    <div class="table">
      <div class="search-container">
        <label class="search-label">
          Поиск по таблице
        </label>
        <div class="search-input-container">
          <el-input
            :prefix-icon="Search"
            class="search-input"
            placeholder="Что вы хотите найти?"
            v-model="searchQuery"
            @input="handleInput"
            size="large"
            clearable
          />
          <el-button
            color="#ECF0F5"
            size="large"
            class="search-button" 
            @click="searchIps"
          >
            Найти
          </el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table :data="filteredIps" stripe>
          <el-table-column
            prop="query"
            label="IP"
            sortable
          />
          <el-table-column
            prop="country"
            label="Страна"
            sortable
          />
          <el-table-column
            prop="regionName"
            label="Регион"
            sortable
          />
          <el-table-column>
            <template v-slot="scope">
              <el-button 
                @click="removeIp(scope.$index)" 
                :icon="Delete"  
                text
              />
              <el-button 
                @click="viewDetails(scope.row.query)" 
                text
                >
                 >
                </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIpStore } from '../stores/ipStore'
import { Search, Delete } from '@element-plus/icons-vue'
import debounce from 'lodash/debounce'

const router = useRouter()
const ipStore = useIpStore()
const searchQuery = ref('')

const debouncedSearch = debounce((value: string) => {
  ipStore.setSearchQuery(value)
}, 500)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  searchQuery.value = value
  debouncedSearch(value)
}

const filteredIps = computed(() => {
  return ipStore.ipList.filter((ip) =>
    ip.query.includes(searchQuery.value)
  )
})

const removeIp = (index: number) => {
  ipStore.removeIp(index)
}

const viewDetails = (ip: string) => {
  router.push(`/ip/${ip}`)
}

const searchIps = () => {
  ipStore.setSearchQuery(searchQuery.value)
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #E1E8F1;
  padding: 1.5rem;
}

.search-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.search-label {
  margin-bottom: 1rem;
  font-weight: bold;
  color: #6B6D80;
}

.search-input-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.search-button {
  height: 100%;
}

.table-container {
  max-height: 15rem;
  overflow-y: auto;
}

th {
  background-color: #2c3e50;
  color: #ffffff;
}
</style>