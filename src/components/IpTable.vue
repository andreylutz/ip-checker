<template>
  <div>
    <el-input
      placeholder="Поиск по IP"
      v-model="searchQuery"
      @input="debouncedSearch"
      clearable
    />
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
      <el-table-column
        prop="city"
        label="Город"
        sortable
      />
      <el-table-column
        prop="isp"
        label="ISP"
        sortable
      />
      <el-table-column label="Действия">
        <template v-slot="scope">
          <el-button @click="removeIp(scope.$index)" type="danger">Удалить</el-button>
          <el-button @click="viewDetails(scope.row.query)">Подробности</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue';
import { useIpStore } from '../stores/ipStore';
import { useRouter } from 'vue-router';
import debounce from 'lodash/debounce';

export default {
  setup() {
    const ipStore = useIpStore();
    const router = useRouter();

    const searchQuery = ref('');

    // Дебаунс для обработки ввода
    const debouncedSearch = debounce((value: string) => {
      ipStore.setSearchQuery(value);
    }, 300);

    watch(searchQuery, (newValue) => {
      debouncedSearch(newValue);
    });

    // Фильтрация списка IP на основе поискового запроса
    const filteredIps = computed(() => {
      return ipStore.ipList.filter((ip) =>
        ip.query.includes(ipStore.searchQuery)
      );
    });

    // Удаление IP из списка
    const removeIp = (index: number) => {
      ipStore.removeIp(index);
    };

    // Переход к деталям IP
    const viewDetails = (ip: string) => {
      router.push(`/ip/${ip}`);
    };

    return {
      searchQuery,
      filteredIps,
      removeIp,
      viewDetails,
    };
  },
};
</script>

<style scoped>
/* Можно добавить стили для таблицы, если необходимо */
</style>