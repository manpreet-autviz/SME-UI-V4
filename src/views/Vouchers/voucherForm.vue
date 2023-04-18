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
            {{ submit }}
          </h3>
          <form>
            <div class="mb-2">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Number of vouchers:</label
              >
              <select
                id="small-input"
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                v-model="number_vouchers"
                @change="handleChange"
                required
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
            <div class="mb-2">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Realms:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="small-input"
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
            <div class="mb-2" v-if="number_vouchers > 1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Batch Name:</label
              >
              <input
                placeholder="Enter batch name"
                v-model="batch"
                required
                type="text"
                id="small-input"
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
              />
            </div>
            <div class="mb-2">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Time Valid (minutes):</label
              >
              <input
                v-model="time_valid"
                type="number"
                min="5"
                id="small-input"
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
              />
            </div>
            <div class="mb-2">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Show QR Code:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                v-model="is_qrcode"
                required
                id="small-input"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div
              class="w-full flex lg:justify-end justify-start items-center mt-3"
            >
              <button
                @click="addVoucher"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
              >
                GENERATE NEW VOUCHER(S)
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
      number_vouchers: "1",
      batch: "",
      time_valid: 5,
      realm: "",
      source: "website",
      is_qrcode: false,
      submit: "Generate new voucher(s)",
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
    async addVoucher() {
      const voucher = {
        number_vouchers: this.number_vouchers,
        batch: this.batch,
        time_valid: this.time_valid,
        realm: this.realm,
        source: "website",
        is_qrcode: this.is_qrcode,
      };
      await instance
        .post(`transactions/`, voucher)
        .then((response) => {
          if (response.status === 201) {
           
            if (response.data.detail) {
              this.$toast.success(response.data.detail, {
                position: "top-right",
              });
            } else {
              this.$toast.success("Voucher Added Successfully", {
                position: "top-right",
              });
            }
          }
        })
        .catch((error) => {
          if (error.response.data.detail) {
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          }
        });
    },
  },
};
</script>
