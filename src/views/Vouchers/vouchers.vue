<template>
  <DashboardHeader title="All Vouchers" description="" :icon="icon.voucher">
    <template v-slot:aside>

      <button @click="showModal = true" type="button"
        class="bg-[#4E8D6D] md:px-6 px-4 py-2 rounded-[0.327rem] flex items-center">
        <span class="font-poppins font-semibold md:text-[1rem] text-[0.8rem] text-[#fff] flex"><img
            src="../../assets/plus-icon.png" class="md:w-[1rem] w-[0.6rem] md:h-[1rem] h-[0.6rem] mt-1 mr-2" alt="" />
          Generate new voucher (s)</span>
      </button>

      <voucherForm v-if="showModal" @close="showModal = false"></voucherForm>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto relative">
      <DashboardTableTitle v-if="propLoaded" :perPageItems="perSize" :pageNumber="page" :ApiData="apiData"
        @handleNext="handlleNext" @handlePrev="handlePrev">
        <template v-slot:section>
          <div class="md:w-[30%] w-[50%]">
            <label class="relative block">
              <span class="sr-only">Search</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="../../assets/search-icon.png" alt="" class="w-[1rem] h-[1rem]" />
              </span>
              <input v-model="searchQuery"
                class="font-normal block w-full rounded-md py-2 pl-9 pr-3 placeholder:text-[#374957] md:text-[0.9rem] text-[0.7rem] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Search vouchers" type="text" name="search" />
            </label>
          </div>
        </template>
      </DashboardTableTitle>
      <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
        <template v-slot:tableBodyData>
          <template v-if="paginatedTableData.length">
            <div v-for="item in paginatedTableData" :key="item.id"
              class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
              <td>
                <div class="flex items-center">
                  <div class="flex flex-col ml-3">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.value
                    }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{ item.time_valid }}</span>
              </td>
              <td>
                <div class="flex flex-col">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.source
                  }}</span>
                </div>
              </td>
              <td>
                <span class="text-[#464E5F]">{{ createdAt(item.created) }}</span>
              </td>
              <td >
                <div  class="flex items-center justify-end">
                  <div v-if="item.is_qrcode" class="bg-[#F3F6F9] w-[2rem] h-[2rem] rounded-[0.375rem] flex items-center justify-center ml-2">
                    <button   @click="showQR(item.id)">
                      <img src="../../assets/Scan-icon.png" alt="africa" class="w-[1.125rem] h-[1.067rem]" />
                    </button>
                    <qrForm :QRnumber="QRValue" v-if="showQRModal" @close="showQRModal = false"></qrForm>
                  </div>
                  <div v-else class="bg-[#F3F6F9] w-[2rem] h-[2rem] rounded-[0.375rem] flex items-center justify-center ml-2">
                    <button disabled>
                      <img src="../../assets/Scan-icon.png" alt="africa" class="w-[1.125rem] h-[1.067rem]" />
                    </button>
                  </div>
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
  vouchers as _vouchers,
  voucherTableHeaders as _voucherTableHeaders,
  voucherTableIcons as _voucherTableIcons,
  dashboardHeadericon,
} from "../../helpers/stub_data/dashboard_routers";
import SmeTable from "../../components/reusable/SmeTable.vue";
import DashboardTableTitle from "../../components/markup/DashboardTableTitle.vue";
import moment from "moment";
import DashboardHeader from "../../components/markup/DashboardHeader.vue";
import instance from "@/axios-interceptor";
import voucherForm from "./voucherForm.vue";
import qrForm from "./qrForm.vue"
import { mapGetters } from "vuex";
export default defineComponent({
  name: "DashboardPage",
  components: {
    DashboardTableTitle,
    SmeTable,
    DashboardHeader,
    voucherForm,
    qrForm
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Vouchers Code");
    const routes = ref([...dashboard_routes]);
    const routers = ref([..._vouchers]);
    const routerTableHeaders = ref([..._voucherTableHeaders]);
    const routerTableIcons = ref([..._voucherTableIcons]);
    const activeId = ref(1);
    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    const isOpenModal = ref(false);
    return {
      routes,
      activeId,
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
      showQRModal:false,
      showModal: false,
      isLoading: false,
      searchQuery: "",
      apiData: [],
      propLoaded: false,
      page: 1,
      perSize: 10,
      voucherList: [
        {
          id: "",
          time_valid: "",
          value: "",
          is_qrcode: false,
          re_usable: false,
          source: "",
          created: "",
        },
      ],
      QRValue:''
    };
  },

  methods: {
    createdAt(date: any) {
      if (date !== '') {
        return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
      }
    },
    handleLogout() {
      router.push({ path: "/" });
    },
    handleSetActive(id: number) {
      this.activeId = id;
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
    handlePrev(data: any) {
      this.page--;
      this.getVouchersData();
    },
    handlleNext(data: any) {
      this.page++;
      this.getVouchersData();
    },
    getVouchersData() {
      this.isLoading = true;
      instance
        .get(`vouchers/?realm__sme=${this.loggedInUser.sme}`)
        .then((response: { data: any }) => {
          this.isLoading = false;
          this.voucherList = response.data.results;
          this.apiData = response.data.results;
          this.propLoaded = true;
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
    showQR(id:any){
      const item = this.filteredTableData.find(item => item.id === id);
        this.showQRModal = true;
        this.QRValue = item.value
      
     
    }
  },

  created() {
    this.getVouchersData();
  },

  computed: {
    ...mapGetters(["loggedInUser"]),
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
    filteredTableData(): any[] {
      if (!this.searchQuery) {
        // If search query is empty, return all data
        return this.voucherList;
      }

      // Filter table data based on search query
      const filteredData = this.voucherList.filter((item) => {
        // Convert item values to lowercase for case-insensitive search
        const time_valid = item.time_valid.toString().toLowerCase();
        const value = item.value.toString().toLowerCase();
        const source = item.source.toString().toLowerCase();
        const created = item.created.toString().toLowerCase();
        const query = this.searchQuery.toLowerCase();

        // Check if name or age contain the search query
        return (
          time_valid.includes(query) ||
          value.includes(query) ||
          source.includes(query) ||
          created.includes(query)
        );
      });
      return filteredData;
    },
    paginatedTableData(): any[] {
      const startIndex = (this.page - 1) * this.perSize;
      const endIndex = startIndex + this.perSize;
      return this.filteredTableData.slice(startIndex, endIndex);
    },
  },
});
</script>
