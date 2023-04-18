<template>
  <div class="popup-modal">
    <div class="popup-modal-content rounded-xl">
      <button @click="$emit('close')" class="float-right">
        <img src="../../assets/close-icon.svg" class="w-[0.8rem] mt-1" alt="" />
      </button>
      <div class="row">
        <div class="col-md-12 mx-auto">
          <h3
            class="text-left mb-4 font-poppins font-semibold md:text-[1.062rem] text-[0.90rem] text-routersTextColor"
          >
            Add Media Category
          </h3>
          <form>
            <div class="mb-2">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Name</label
              >

              <input
                v-model="name"
                type="text"
                min="5"
                id="small-input"
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
              />
            </div>
            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Realms:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="realm"
                v-model="realm"
                required
              >
                <option value="">Select Realm</option>
                <option
                  v-for="realmItem in realmslist"
                  :key="realmItem.id"
                  :value="realmItem.id"
                >
                  {{ realmItem.name }}
                </option>
              </select>
            </div>

            <div
              class="w-full flex lg:justify-end justify-start items-center mt-3"
            >
              <button
                @click="addCategory"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
              >
                Add Media Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import instance from "@/axios-interceptor";
export default {
  name: "VoucherForm",

  props: {
    modal: {
      type: Boolean,
    },
  },
  data() {
    return {
      realmslist: [
        {
          id: "",
          name: "",
        },
      ],
      name: "",
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  mounted() {
    this.getRealms();
  },
  methods: {
    getRealms() {
      instance
        .get(`realms/?sme=${this.loggedInUser.sme}`)
        .then((response) => {
          this.realmslist = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async addCategory() {
      const mediaCategory = {
        name: this.name,

        realm: this.realm,
      };
      await instance
        .post(`categories/`, mediaCategory)
        .then((response) => {
          if (response.status === 201) {
            this.$toast.success("Media Category Created", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          if (error.response.data.detail) {
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          } else {
            this.$toast.error("Could not create media at this time", {
              position: "top-right",
            });
          }
        });
    },
  },
};
</script>
