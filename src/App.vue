<template>
  <div
    v-if="!isNotShowHeaderAndSidebar"
    class="flex flex-col -z-10"
    @click="handleCloseModal"
  >
    <DashboardTopNav
      :isOpenModal="isOpenModal"
      @onToggle="onToggle"
      @handleOpenOrCloseModal="handleOpenOrCloseModal"
      companyLabel="RESTAURANT 2"
    />

    <div class="bg-dashboardBg flex">
      <div
        class="lg:w-[8vw] lg:flex lg:items-center items-start flex-col toggle-sidenav"
        :class="[isToggle ? 'block' : 'hidden']"
      >
        <span
          class="my-3 lg:text-center font-semibold text-[0.75rem] font-poppins text-[#888889] tracking-wider bg-white-mobile lg:block hidden"
          >Actions</span
        >
        <div
          class="border-r-2 border-sidebarBorder h-full flex flex-col lg:items-center items-start lg:w-full md:w-[15vw] w-[30vw] bg-white-mobile overflow-auto"
        >
          <SidebarIcon
            v-for="route in routes"
            :route-path="route.path"
            :key="route.id"
            :title="route.title"
           
            :icon="route.icon"
            classes="mb-2"
            @click="handleSetActive(route.id, route.title)"
            :isActive="activeId === route.id"
          />
        </div>
      </div>
      <div class="mb-3 lg:mx-12 w-full px-4 lg:px-0">
        <div class="w-full my-3">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isNotShowHeaderAndSidebar" class="w-full lg:px-0">
    <div class="w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DashboardTopNav from "../src/components/markup/DashboardTopNav.vue";
import DashboardHeader from "../src/components/markup/DashboardHeader.vue";
import SidebarIcon from "../src/components/reusable/SidebarIcon.vue";
import moment from "moment";
import { dashboard_routes } from "./helpers/stub_data/dashboard_routes";
import {
  routers as _routers,
  routerTableHeaders as _routerTableHeaders,
  routerTableIcons as _routerTableIcons,
  dashboardHeadericon,
} from "./helpers/stub_data/dashboard_routers";

export default defineComponent({
  name: "AppPage",
  components: {
    DashboardTopNav,
    SidebarIcon,
  },

  setup() {
    const isOpenModal = ref(false);
    const isToggle = ref(false);
    const isNotShowHeaderAndSidebar = ref(false);
    const icon = ref({ ...dashboardHeadericon });
    const routes = ref([...dashboard_routes]);
    const routers = ref([..._routers]);
    const activeId = ref(1);
    const activeTab = ref("");
    return {
      isOpenModal,
      icon,
      routes,
      routers,
      activeId,
      activeTab,
      isToggle,
      isNotShowHeaderAndSidebar,
    };
  },

  computed: {
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
    dashboadHeaderIcon() {
      if (this.activeTab == "Account") {
        return dashboardHeadericon.accountIcon;
      } else if (this.activeTab == "Routers") {
        return dashboardHeadericon.router;
      } else if (this.activeTab == "Billing") {
        return dashboardHeadericon.accountIcon;
      } else if (this.activeTab == "Support") {
        return dashboardHeadericon.accountIcon;
      } else if (this.activeTab == "Files") {
        return dashboardHeadericon.fileIcon;
      } else if (this.activeTab == "Captive Portal") {
        return dashboardHeadericon.captiveportal;
      } else if (this.activeTab == "Dashboard") {
        return dashboardHeadericon.dashboard;
      } else if (this.activeTab == "Vouchers") {
        return dashboardHeadericon.voucher;
      } else if (this.activeTab == "Feedback") {
        return dashboardHeadericon.feedback;
      } else {
        return dashboardHeadericon.router;
      }
    },
  },
  beforeMount() {
    this.isAccountModule();
    var checkActiveTab = localStorage.getItem("activeTab");
    var activeId = localStorage.getItem("activeId");
    if (checkActiveTab != null && parseInt) {
      this.activeTab = checkActiveTab;
      this.activeId = activeId != null ? parseInt(activeId) : 0;
    }
  },
  watch: {
    $route(to, from) {
      this.isAccountModule();
    },
  },
  data() {
    return {
      activebtnId: "",
    };
  },
  methods: {
    handleCloseModal() {
      if (this.isOpenModal) {
        this.isOpenModal = false;
      }
    },
    handleOpenOrCloseModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    onToggle() {
      this.isToggle = !this.isToggle;
    },
    handleSetActive(id: number, title: string) {
      this.activeId = id;
      localStorage.setItem("activeId", id.toString());
      this.activeTab = title;
      localStorage.setItem("activeTab", title);
    },
    isAccountModule() {
      var hrefPath = document.location.pathname;

      if (
        hrefPath == "/otp" ||
        hrefPath == "/forgot-password" ||
        hrefPath == "/signup" ||
        hrefPath == "/"
      ) {
        this.isNotShowHeaderAndSidebar = true;
      } else {
        this.isNotShowHeaderAndSidebar = false;
      }
    },
  },
});
</script>
