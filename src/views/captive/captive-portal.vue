<template>
  <DashboardHeader title="Landing Page Builder" :icon="icon.captiveportal">
    <template v-slot:aside>
      <div class="bg-[#DCE9E3] px-3 py-2 rounded-[0.327rem] flex items-center">
        <span class="font-poppins font-medium md:text-[1rem] text-[0.60rem] text-[#959CBD]">Today: <span
            class="text-[#4E8D6D] font-semibold">{{
              today }}</span></span>
        <img src="../../assets/today.png" alt="africa" class="w-[1.099rem] h-[1.062rem] rounded ml-1" />
      </div>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto">
      <DashboardTableTitle v-if="propLoaded" :perPageItems="perSize" :pageNumber="page" :ApiData="apiData">
        <template v-slot:section>
          <div>
            <span class="font-poppins font-semibold md:text-[1.01rem] text-[0.9rem] text-[#212121]">Captive Portal
              templates</span>
            <div class="flex items-center">
              <span class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]">Management of captive portal
                templates.</span>
            </div>
          </div>
        </template>
      </DashboardTableTitle>
      <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
        <template v-slot:tableBodyData>
          <template v-if="paginatedTableData.length ">
          <div v-for="item in paginatedTableData" :key="item.id"
            class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
            <td>
              <div class="flex items-center">
                <div class="bg-[#F3F6F9] w-[1.8rem] h-[1.8rem] rounded-[0.337rem] flex items-center justify-center">
                </div>
                <div class="flex flex-col ml-3">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.name
                  }}</span>
                  
                </div>
              </div>
            </td>
            <td v-if="item.id">
              <div class="flex flex-col">
                <span class="capitalize text-[#464E5F] mb-0.5">{{
                  formatDate(item.createdAt)
                }}</span>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{  formatDate(item.udatedAt) }}</span>
            </td>
            <td>
              <div class="flex items-center justify-end">
                <div v-for="item in routerTableIcons" :key="item.content"
                  class="bg-[#F3F6F9] rounded-[0.375rem] flex items-center justify-center ml-2">
                  <button v-if="item.type == 'img'" class="w-[2rem] h-[2rem] text-center">
                    <img :src="item.content" alt="africa" class="w-[1.125rem] h-[1.067rem] mx-auto" />
                  </button>
                  <button v-if="item.type == 'text'"
                    class="bg-[#F3F6F9] text-[#4E8D6D] rounded-[0.375rem] font-semibold rounded-[0.432rem] py-2 px-3">
                    {{ item.content }}
                  </button>
                </div>
              </div>

            </td>
          </div>
        </template>
        <div v-else class="w-full text-center text-[12px] text-[#afafaf] mt-4"><b>No Record found</b></div>
        </template>
      </SmeTable>
     
      <div class="text-center mt-9" v-if="paginatedTableData.length === 0" >
        <img src="../../assets/interaction-browser.svg" class="m-auto mb-4 " alt="">
       <span class="text-[#000] font-poppins font-medium text-[12px]">No Captive Portal template</span>
        <button
        type="button"
        class="bg-[#4E8D6D] mt-1 md:px-6 px-4 py-2 rounded-[0.327rem] m-auto flex items-center"
        @click="showModal = true"
      >
        <span
          class="font-poppins font-semibold md:text-[1rem] text-[0.8rem] text-[#fff] flex"
        >
          <img
            src="../../assets/plus-icon.png"
            class="md:w-[1rem] w-[0.6rem] md:h-[1rem] h-[0.6rem] mt-1 mr-2"
            alt=""
          />
          Customise one now</span
        >
      </button>
      <CustomizePortal v-if="showModal" @close="closeModal()"></CustomizePortal>
      </div>
      <div v-if="isLoading" class="spinner-container">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { dashboard_routes } from '../../helpers/stub_data/dashboard_routes';
import {
  captive as _captive,
  captiveTableHeaders as _captiveTableHeaders,
  captiveTableIcons as _captiveTableIcons,
  dashboardHeadericon
} from '../../helpers/stub_data/dashboard_routers';
import SmeTable from '../../components/reusable/SmeTable.vue';
import DashboardTableTitle from '../../components/markup/DashboardTableTitle.vue';
import moment from 'moment';
import DashboardHeader from '../../components/markup/DashboardHeader.vue'
import instance from '@/axios-interceptor';
import { mapGetters } from 'vuex';
import CustomizePortal from './customize-portal.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardTableTitle,
    SmeTable,
    DashboardHeader,
    CustomizePortal
},
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Name")
    const routers = ref([..._captive]);
    const routerTableHeaders = ref([..._captiveTableHeaders]);
    const routerTableIcons = ref([..._captiveTableIcons]);
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
      icon
    };
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      captiveList:[{
         name:'',
         createdAt:'',
         updatedAt:'',
      }],
      searchQuery: '',
      apiData: [],
      propLoaded: false,
      page: 1,
      perSize: 10,
    }
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    today() {
      return moment(Date.now()).format('MMMM Do');
    },
    paginatedTableData(): any[] {
      const startIndex = (this.page - 1) * this.perSize;
      const endIndex = startIndex + this.perSize;
      return this.captiveList.slice(startIndex, endIndex);
    },
  },
  methods: {
    formatDate(date:any){
      if(date !== ''){
        return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
      }
     
     },
    handleLogout() {
      router.push({ path: '/' });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    getCaptiveData() {
      this.isLoading = true;
      instance
        .get(`sme/${this.loggedInUser.sme}/captive-portal/`)
        .then((response) => {
          this.captiveList = response.data;
          this.propLoaded = true;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;

        });
    },
    closeModal(){
      this.showModal = false;
      this.getCaptiveData();
    }
  },
  mounted() {
    this.getCaptiveData();
  },
});
</script>
