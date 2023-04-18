<template>
  <DashboardHeader title="Allocated Routers" :icon="icon.router">
    <template v-slot:aside>
      <div class="bg-[#DCE9E3] px-3 py-2 rounded-[0.327rem] flex items-center">
        <span
          class="font-poppins font-medium md:text-[1rem] text-[0.60rem] text-[#959CBD]"
          >Today:
          <span class="text-[#4E8D6D] font-semibold">{{ today }}</span></span
        >
        <img
          src="../../assets/today.png"
          alt="africa"
          class="w-[1.099rem] h-[1.062rem] rounded ml-1"
        />
      </div>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div
      class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto relative"
    >
      <DashboardTableTitle
        v-if="propLoaded"
        :perPageItems="perSize"
        :pageNumber="page"
        :ApiData="apiData"
        @handleNext="handlleNext"
        @handlePrev="handlePrev"
      >
        <template v-slot:section>
          <div>
            <span
              class="font-poppins font-semibold md:text-[1.01rem] text-[0.9rem] text-[#212121]"
              >Routers</span
            >
            <div class="flex items-center">
              <span
                class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]"
                >Rows per page</span
              ><span
                class="bg-[#F3F6F9] w-[1.739rem] h-[1.178rem] flex items-center justify-center ml-1 rounded-[0.337rem] text-[#464E5F] font-poppins font-semibold text-[0.673rem]"
              >
                <select v-model="selectedOption" @change="handleChange">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select></span
              >
            </div>
          </div>
        </template>
      </DashboardTableTitle>

      <SmeTable :tableHeaderData="routerTableHeaders" :table-name="tableName">
        <template v-slot:tableBodyData>
          <template v-if="paginatedTableData.length">
            <div
              v-for="item in paginatedTableData"
              :key="item.id"
              class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]"
            >
              <td>
                <div class="flex items-center">
                  <div
                    class="bg-[#F3F6F9] w-[2.806rem] h-[2.806rem] rounded-[0.337rem] flex items-center justify-center"
                  >
                    <img
                      :src="
                        item.location === 'In Transit'
                          ? require('../../assets/router.png')
                          : item.location === 'Manufacturer'
                          ? require('../../assets/transit_router.png')
                          : require('../../assets/active_router.png')
                      "
                      :alt="item.nasidentifier"
                      class="w-[1.89rem] h-[1.779rem]"
                    />
                  </div>

                  <div class="flex flex-col ml-3">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.nasidentifier
                    }}</span>
                    <span>{{ item.serial_number }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{ item.imei }}</span>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.os_version_name
                  }}</span>
                  <span>version {{ item.os_version_id }}</span>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{ item.model_number }}</span>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.ip_address
                  }}</span>
                  <span>{{ item.last_contact_ip }}</span>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{
                  createdAt(item.created)
                }}</span>
              </td>
              <td>
                <div class="flex items-center justify-end">
                  <div
                    v-for="item in routerTableIcons"
                    :key="item"
                    class="bg-[#F3F6F9] w-[2rem] h-[2rem] rounded-[0.375rem] flex items-center justify-center ml-2"
                  >
                    <button>
                      <img
                        :src="item"
                        alt="africa"
                        class="w-[1.125rem] h-[1.067rem]"
                      />
                    </button>
                  </div>
                </div>
              </td>
            </div>
          </template>
          <div
            v-else
            class="w-full text-center text-[12px] text-[#afafaf] mt-4"
          >
            <b>No Record Found</b>
          </div>
        </template>
      </SmeTable>

      <div v-if="isLoading" class="spinner-container">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import {
  routers as _routers,
  routerTableHeaders as _routerTableHeaders,
  routerTableIcons as _routerTableIcons,
  dashboardHeadericon,
} from "../../helpers/stub_data/dashboard_routers";

import SmeTable from "../../components/reusable/SmeTable.vue";

import DashboardTableTitle from "../../components/markup/DashboardTableTitle.vue";

import DashboardHeader from "../../components/markup/DashboardHeader.vue";
import moment from "moment";
import axios from "axios";
import instance from "../../axios-interceptor";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "DashboardPage",
  components: {
    DashboardTableTitle,
    SmeTable,

    DashboardHeader,
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Serial Number");

    const routers = ref([..._routers]);
    const routerTableHeaders = ref([..._routerTableHeaders]);
    const routerTableIcons = ref([..._routerTableIcons]);
    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    return {
      routers,
      routerTableHeaders,
      routerTableIcons,
      center,
      markers,
      tableName,
      icon,
    };
  },

  data() {
    return {
      isLoading: false,
      selectedOption: 10,
      apiData: [],
      propLoaded: false,
      page: 1,
      perSize: 10,
      routerList: [
        {
          id: "",
          nasidentifier: "",
          serial_number: "",
          icon: "",
          imei: "",
          os_version_name: "",
          os_version_id: "",
          location: "",
          model_number: "",
          ip_address: "",
          last_contact_ip: "",
          created: "",
        },
      ],
    };
  },

  methods: {
    createdAt(date: any) {
      if (date !== "") {
        return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
      }
    },
    handlePrev(data: any) {
      this.page--;
      this.getRouterData();
    },
    handlleNext(data: any) {
      this.page++;
      this.getRouterData();
    },
    handleLogout() {
      router.push({ path: "/" });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    getRouterData() {
      this.isLoading = true;
      instance
        .get(`routers/?sme=${this.loggedInUser.sme}`)
        .then((response: { data: any }) => {
          this.routerList = response.data.results;
          this.apiData = response.data.results;
          this.propLoaded = true;
          this.isLoading = false;
        })
        .catch((error: any) => {
          this.isLoading = false;
          if (error.response) {
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          }
        });
    },
    handleChange() {
      this.perSize = this.selectedOption;
      this.getRouterData();
    },
  },
  mounted() {
    this.getRouterData();
  },

  computed: {
    ...mapGetters(["loggedInUser"]),

    today() {
      return moment(Date.now()).format("MMMM Do");
    },
    paginatedTableData(): any[] {
      const startIndex = (this.page - 1) * this.perSize;
      const endIndex = startIndex + this.perSize;
      return this.routerList.slice(startIndex, endIndex);
    },
  },
});
</script>
