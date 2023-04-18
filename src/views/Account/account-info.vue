<template>
  <DashboardHeader title="Your Profile" :icon="icon.accountIcon">
    <template v-slot:aside>
      <div class="bg-[#DCE9E3] px-3 py-2 rounded-[0.327rem] flex items-center">
        <span class="font-poppins font-medium md:text-[1rem] text-[0.60rem] text-[#959CBD]">Today:
          <span class="text-[#4E8D6D] font-semibold">{{ today }}</span></span>
        <img src="../../assets/today.png" alt="africa" class="w-[1.099rem] h-[1.062rem] rounded ml-1" />
      </div>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div class="md:flex flex-row items-start gap-y-8 gap-x-8 mt-8 sm:gap-y-16">
      <div
        class="lg:basis-2/5 relative flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible shadow-lg p-6 shadow-gray-900/5 bg-white rounded-2xl">
        <div
          class="lg:grid auto-cols-auto grid-flow-col justify-start whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center lg:grid-flow-row lg:grid-cols-1 lg:text-left">
          <h3 class="font-medium mb-6 px-3 mt-3">Your Profile</h3>
          <div class="relative px-3 py-3 listhover rounded-md" :class="[activeTab == 'profile' ? 'bg-white ' : '']">
            <img class="inline-block" src="../../assets/user-profile.svg" alt="" />
            <div class="relative inline-block">
              <div class="text-md text-slate-500">
                <button @click="handleSetActiveTab('profile')" class="text-[#464E5F] ml-3 font-medium" role="tab"
                  type="button">
                  Your Profile
                </button>
              </div>
            </div>
          </div>
          <div class="relative px-3 py-3 listhover rounded-md"
            :class="[activeTab == 'changepassword' ? 'bg-white ' : '']">
            <img class="inline-block" src="../../assets/lock.svg" alt="" />
            <div class="relative inline-block">
              <div class="text-md text-slate-500">
                <button @click="handleSetActiveTab('changepassword')" class="text-[#464E5F] ml-3 font-medium">
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <div class="relative px-3 py-3 listhover rounded-md mb-3">
            <img class="inline-block" src="../../assets/sign-in.svg" alt="" />
            <div class="relative inline-block">
              <div @click="handleLogout" class="text-md text-blue-600">
                <button class="text-[#464E5F] ml-3 font-medium">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-3 asis-1/2 full-width" :class="[activeTab == 'profile' ? 'block ' : 'hidden']">
        <form @submit.prevent="submitForm">
          <div class="profile-sec full-width">
            <h2 class="font-medium md:text-[1.8rem] text-[1.4rem] md:mt-0 mt-5">
              Profile
            </h2>
            <div
              class="mt-6 gap-x-8 gap-y-10 shadow-lg p-6 shadow-gray-900/5 bg-white rounded-2xl relative full-width grid grid-cols-1 gap-x-25 xl:grid-cols-2">
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  First Name
                </span>
                <input type="name" name="firstName"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Enter First Name" v-model="firstName" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Last Name
                </span>
                <input type="name" name="lastName"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Enter Your LastName" v-model="lastName" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Phone
                </span>
                <input type="name" name="phone"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Enter Phone " v-model="phone" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Gender
                </span>
                <select id="gender" type="name"
                  class="text-[14px] w-full h-[2.688rem] border-[0rem] bg-[#f3f6f9] rounded-[0.625rem] px-3 py-2 border-textFieldBorder border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  v-model="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Profile Picture
                </span>
                <input type="file" name="profilePic"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Enter First Name" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Date of Birth
                </span>
                <input type="date" name="dob"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  placeholder="Enter Your Date of birth" v-model="date_of_birth" />
              </label>
            </div>


            <button class="bg-violet-500 py-3 px-12 mt-8 font-semibold font-poppins">
              Save Changes
            </button>
            <button @click="reloadPage" class="bg-violet-100 py-3 px-12 md:mt-8 mt-3 font-semibold font-poppins md:ml-3">
              Cancel
            </button>
          </div>
        </form>

        <div class="email-sec mt-8 full-width" :class="[activeTab == 'changepassword' ? 'd-block ' : 'd-none']">
          <h2 class="font-medium mt-6 inline-block md:text-[1.8rem] text-[1.4rem]">
            Change Email Address
          </h2>
          <div
            class="mt-6 shadow-lg p-6 gap-x-8 gap-y-10 shadow-gray-900/5 bg-white rounded-2xl relative grid full-width grid-cols-1 gap-x-25 xl:grid-cols-2">
            <label class="block">
              <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                Email Address
              </span>
              <input type="email" name="email" readonly
                class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Enter Email Address" v-model="email" />
            </label>
          </div>
          <button type="submit" class="bg-violet-500 py-3 px-12 mt-8 font-semibold font-poppins">
            Save Changes
          </button>
          <button class="bg-violet-100 py-3 px-12 md:mt-8 mt-3 font-semibold font-poppins md:ml-3">
            Cancel
          </button>
        </div>
      </div>
      <div class="lg:col-span-3 asis-1/2" :class="[activeTab == 'changepassword' ? 'block ' : 'hidden']">
        <form @submit.prevent="changePasswordForm">
          <div class="profile-sec">
            <h2 class="font-medium md:text-[1.8rem] text-[1.4rem] md:mt-0 mt-5">
              Change Password
            </h2>
            <div
              class="mt-6 gap-x-8 md:gap-y-10 gap-y-5 shadow-lg p-6 shadow-gray-900/5 bg-white rounded-2xl relative full-width grid grid-cols-1 gap-x-25 xl:grid-cols-1">
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Existing Password
                </span>
                <input type="password" name="old_password"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  v-model="old_password" placeholder="" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  New Password
                </span>
                <input type="password" name="new_password"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  v-model="new_password" placeholder="" />
              </label>
              <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-3">
                  Confirm Password
                </span>
                <input type="password" name="confirm_password"
                  class="mt-1 font-semibold px-6 py-2 border-none shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                  v-model="confirm_password" placeholder="" />
                <p v-if="confirmPasswordError" class="error">
                  {{ confirmPasswordError }}
                </p>
              </label>
            </div>
            <button type="submit" class="bg-violet-500 py-3 px-12 mt-8 font-semibold font-poppins">
              Save Changes
            </button>
            <button @click="reloadPage" class="bg-violet-100 py-3 px-12 md:mt-8 mt-3 font-semibold font-poppins md:ml-3">
              Cancel Changes
            </button>
          </div>
        </form>
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
import moment from "moment";
import DashboardHeader from "../../components/markup/DashboardHeader.vue";
import instance from "@/axios-interceptor";

export default defineComponent({
  name: "account-info",
  components: {
    DashboardHeader,
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const activeId = ref(1);
    const activeTab = ref("profile");
    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    const isOpenModal = ref(false);
    return {
      activeId,
      center,
      markers,
      isOpenModal,
      activeTab,
      icon,
    };
  },

  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
      date_of_birth: "",
      new_password: "",
      old_password: "",
      confirm_password: "",
      confirmPasswordError: "",
    };
  },
  computed: {
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
  },
  methods: {
    
    handleLogout() {
      localStorage.removeItem("access_token");
      router.push({ path: "/" });
    },

    handleSetActive(id: number) {
      this.activeId = id;
    },
    handleSetActiveTab(name: string) {
      this.activeTab = name;
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
    async submitForm() {
      const formData = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone,
        gender:this.gender,
        date_of_birth :this.date_of_birth
      };
      try {
        const response = await instance.put("auth/users/me/", formData);
        if(response){
          this.$toast.success("Profile Updated successfully", {
            position: "top-right",
          });
          this.getuserData();
        }
      } catch (error) {
        console.error(error);
      }
    },

    changePasswordForm() {
      if (this.new_password === this.confirm_password) {
        this.confirmPasswordError = "";
        this.changePassword();
      } else {
        this.confirmPasswordError = "Passwords do not match";
      }
    },
    async changePassword() {
      const formData = {
        new_password: this.new_password,
        current_password: this.old_password,
      };
      try {
        const response = await instance.post(
          "auth/users/set_password/",
          formData
        );
        if(response){
          this.$toast.success("Password reset has been sent to your inbox.", {
            position: "top-right",
          });
        }
      } catch (error:any) {
        if (error.response.data.detail) {
          this.$toast.info(error.response.data.detail);
        } else {
          this.$toast.error("Could not update password at this time");
        }
      
      }
    },
    reloadPage() {
      window.location.reload();
    },
    getuserData() {
      instance
        .get(`auth/users/me/`)
        .then((response: { data: any }) => {
          this.firstName = response.data.first_name;
          this.lastName = response.data.last_name;
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.gender = response.data.gender;
          this.date_of_birth = response.data.date_of_birth
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
  },
  onSetActiveg() {
    this.$emit("click");
  },
  mounted() {
    this.getuserData();
  },
});
</script>
