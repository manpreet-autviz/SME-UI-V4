<template>
    <DashboardHeader title="Feedback" description="" :icon="icon.feedback">
     
    </DashboardHeader>
    <div class="w-full my-3">
      <div
        class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto"
      >
        <DashboardTableTitle v-if="propLoaded" :perPageItems="perSize" :pageNumber="page" :ApiData="feedbackList" @handleNext="handlleNext" @handlePrev="handlePrev">
          <template v-slot:section>
            <div class="md:w-[30%] w-[50%]">
              <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <img
                    src="../../assets/search-icon.png"
                    alt=""
                    class="w-[1rem] h-[1rem]"
                  />
                </span>
                <input v-model="searchQuery"
                  class="font-normal block w-full rounded-md py-2 pl-9 pr-3 placeholder:text-[#374957] md:text-[0.9rem] text-[0.7rem] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Search"
                  type="text"
                  name="search"
                />
              </label>
            </div>
          </template>
        </DashboardTableTitle>
        <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
          <template v-slot:tableBodyData>
            <template v-if="paginatedTableData.length">
            <div
              v-for="item in paginatedTableData"
              :key="item.id"
              class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]"
            >
              <td >
                <div class="flex items-center">
                  
                  <div class="flex flex-col ml-3">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.rating
                    }}</span>
                    
                  </div>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{ item.comment }}</span>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.createdAt
                  }}</span>
                </div>
              </td>
              
             
            </div>
          </template>
            <div v-else class="w-full text-center text-[12px] text-[#afafaf] mt-4">
              <b>No Record found</b>
            </div>
          </template>
         
        </SmeTable>
        <div class="spinner-container">
          <div v-if="isLoading" class="spinner"></div>
        </div>
       
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import router from "@/router";
  import { dashboard_routes } from "../../helpers/stub_data/dashboard_routes";
  import {
    fileMedia as _fileMedia,
    feedbackTableHeaders as _feedbackTableHeaders,
    fileMediaTableIcons as _fileMediaTableIcons,
    dashboardHeadericon,
  } from "../../helpers/stub_data/dashboard_routers";
  
  import SmeTable from "../../components/reusable/SmeTable.vue";
  import DashboardHeader from "../../components/markup/DashboardHeader.vue";
  import DashboardTableTitle from "../../components/markup/DashboardTableTitle.vue";
  import moment from "moment";
  import axios from "axios";
  import instance from "@/axios-interceptor";

  export default defineComponent({
    name: "FeedbackPage",
    components: {
      DashboardTableTitle,
      SmeTable,
      DashboardHeader,
    },
    setup() {
      const icon = ref({ ...dashboardHeadericon });
      const tableName = ref("Realm");
  
      const routers = ref([..._fileMedia]);
      const routerTableHeaders = ref([..._feedbackTableHeaders]);
      const routerTableIcons = ref([..._fileMediaTableIcons]);
  
      const center = ref({ lat: -1.8899577, lng: 30.0634073 });
      const markers = ref([
        {
          position: { lat: -1.8899577, lng: 30.0634073 },
        },
      ]);
      const isOpenModal = ref(false);
      return {
        routers,
        routerTableHeaders,
        routerTableIcons,
        center,
        markers,
        isOpenModal,
        tableName,
        icon,
      };
    },
  
    data() {
      return {
        isLoading: false,
        showModal: false,
        searchQuery: '',
        propLoaded:false,
        page:1,
        perSize:10,
        feedbackList: [
          {
            id: "",
            rating: "",
            comment: "",
            createdAt: "",
            
          },
        ],
      };
    },
  
    methods: {
      handlePrev(data: any){
        this.page--;
        this.getFeedbackData()
      },
      handlleNext(data:any){
        this.page++;
        this.getFeedbackData()
      },
      handleLogout() {
        router.push({ path: "/" });
      },
      getDate(date: Date | number) {
        return moment(date).calendar();
      },
      handleOpenOrCloseModal() {
        this.isOpenModal = !this.isOpenModal;
      },
      handleCloseModal() {
        if (this.isOpenModal) {
          this.isOpenModal = false;
        }
      },
     
  
      getFeedbackData() {
        this.isLoading = true;
        instance
          .get("sme/1/rating/")
          .then((response) => {
            this.feedbackList = response.data;
            this.propLoaded = true;
            this.isLoading = false;
          })
          .catch((error) => {
            this.isLoading = false;

          });
      },

    },
    mounted() {
      this.getFeedbackData();
    },
    computed: {
      today() {
        return moment(Date.now()).format("MMMM Do");
      },
      filteredTableData(): any[] {
        
        if (!this.searchQuery) {
         
          // If search query is empty, return all data
          return this.feedbackList;
        }
  
        // Filter table data based on search query
        const filteredData = this.feedbackList.filter(item => {
          // Convert item values to lowercase for case-insensitive search
          const rating = item.rating.toString().toLowerCase();
          const comment = item.comment.toString().toLowerCase();
          const createdAt = item.createdAt.toString().toLowerCase();
          const query = this.searchQuery.toLowerCase();
  
          // Check if name or age contain the search query
          return rating.includes(query) || comment.includes(query) || createdAt.includes(query) ;
        });
        return filteredData;
      },
      paginatedTableData(): any[] {
      const startIndex = (this.page - 1) * this.perSize
      const endIndex = startIndex + this.perSize
      return this.filteredTableData.slice(startIndex, endIndex)
    }
    },
  });
  </script>
  