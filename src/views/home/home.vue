<template>
    <DashboardHeader title="Dashboard" :icon="icon.dashboard">
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

      <div class="w-full lg:flex my-6 justify-between">
        <SmeAnalytics />
        <div
          class="bg-white lg:w-[49%] min-h-[21.432rem] rounded-[0.938rem] py-3 px-6 shadow lg:mb-0 mb-5"
        >
          <span class="font-poppins font-semibold text-[0.9rem] text-[#212121]"
            >Map</span
          >
          <div class="w-full mt-6">
            <GMapMap
              :center="center"
              :zoom="1"
              map-type-id="terrain"
              style="width: 100%; height: 25.75rem"
            >
              <GMapCluster>
                <GMapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center = m.position"
                />
              </GMapCluster>
            </GMapMap>
          </div>
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
  

  
  
  import SmeAnalytics from "../../components/markup/SmeAnalytics.vue";
  
  import DashboardHeader from "../../components/markup/DashboardHeader.vue";
  import moment from "moment";
  import axios from "axios";
  import instance from "../../axios-interceptor";
  
  export default defineComponent({
    name: "HomePage",
    components: {

      SmeAnalytics,
  
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
  
    computed: {
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
   
  },
  
   

    
  });
  </script>