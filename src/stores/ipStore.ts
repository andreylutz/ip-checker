import { defineStore } from 'pinia';

interface IpData {
  query: string;
  status: string;
  country: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  isp: string;
  org: string;
  as: string;
}

export const useIpStore = defineStore('ipStore', {
  state: () => ({
    ipList: [] as IpData[],
    searchQuery: '',
  }),
  actions: {
    setIpList(list: IpData[]) {
      this.ipList = list;
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    clearIpList() {
      this.ipList = [];
    },
    removeIp(index: number) {
      this.ipList.splice(index, 1);
    },
  },
});