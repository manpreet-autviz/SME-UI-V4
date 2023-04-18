<template>
  <DashboardHeader title="Billing" description="" :icon="icon.Billing">
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
    <div class="w-full md:flex my-6 justify-left">
      <div class=" lg:w-[15%] md:min-h-[8rem] min-h-[4rem] rounded-[0.938rem] md:mb-0 mb-3 md:mr-8 mt-3">
        <select class="text-[1.4rem] text-[#1A202C] font-semibold bg-transparent full-width font-poppins">
          <option>Last
            30 days</option>
        </select>
      </div>
      <div class=" lg:w-[15%] md:min-h-[8rem] min-h-[4rem] rounded-[0.938rem] md:mb-0 mb-3 md:mr-8">
        <label class="text-[1rem] text-[#718096] font-medium full-width font-poppins">Transactions</label>
        <h3 class="text-[1.4rem] text-[#1A202C] font-semibold full-width font-poppins mt-1">56</h3>
      </div>
      <div class=" lg:w-[15%] md:min-h-[8rem] min-h-[4rem] rounded-[0.938rem] md:mb-0 mb-3 md:mr-8">
        <label class="text-[1rem] text-[#718096] font-medium full-width font-poppins">Total Spent</label>
        <h3 class="text-[1.4rem] text-[#1A202C] font-semibold full-width font-poppins mt-1">$10,654.00</h3>
      </div>
    </div>
    <div class="w-full md:flex my-6 justify-between">
      <div class="bg-white md:w-[49%] lg:min-h-[21.432rem] rounded-[0.938rem] md:mb-0 mb-3">
        <img src="../../assets/statistics.svg" alt="">
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { dashboard_routes } from '../../helpers/stub_data/dashboard_routes';
import {
  support as _support,
  supportTableHeaders as _supportTableHeaders,
  supportTableIcons as _supportTableIcons,
  dashboardHeadericon
} from '../../helpers/stub_data/dashboard_routers';
import SmeTable from '../../components/reusable/SmeTable.vue';
import DashboardTableTitle from '../../components/markup/DashboardTableTitle.vue';
import moment from 'moment';
import DashboardHeader from '../../components/markup/DashboardHeader.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardHeader
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Ticket ID")
    const routers = ref([..._support]);
    const routerTableHeaders = ref([..._supportTableHeaders]);
    const routerTableIcons = ref([..._supportTableIcons]);
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
  computed: {
    today() {
      return moment(Date.now()).format('MMMM Do');
    },
  },
  methods: {
    handleLogout() {
      router.push({ path: '/' });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },

  },
});
</script>
