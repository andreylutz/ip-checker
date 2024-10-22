import { defineStore } from 'pinia'

export interface IIpData {
  status:string,
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
  query: string
}

export const useIpStore = defineStore('ipStore', {
  state: () => ({
    ipList: [] as IIpData[],
    searchQuery: '',
  }),
  actions: {
    setIpList(list: IIpData[]) {
      this.ipList = list
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
    },
    clearIpList() {
      this.ipList = []
    },
    removeIp(index: number) {
      this.ipList.splice(index, 1)
    },
  },
})