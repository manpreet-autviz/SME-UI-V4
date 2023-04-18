<template>
  <div class="w-full lg:flex justify-between">
    <div class="lg:w-[50%]">
      <div class="flex flex-col justify-center items-center h-full relative">
        <div class="max-form w-full lg:py-0 py-10">
          <img
            src="../../assets/ared-logo.svg"
            class="w-[8rem] lg:hidden block m-auto mb-5"
            alt="right view"
          />
          <div class="bg-white rounded-[0.432rem] lg:p-0 p-4">
            <h1 class="font-['poppins'] font-bold text-[26px] text-center">
              OTP Sent!
            </h1>
            <p
              class="font-poppins font-normal text-[18px] mt-2 text-[#4E8D6E] text-center"
            >
              Enter the One Time Password token sent to your email.
            </p>
            <form class="mt-10">
              <TextField
                name="otp"
                class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="OTP"
                type="text"
                v-model="v$.otp.$model"
                :showErrors="v$.otp.$errors.length ? true : false"
                :errors="v$.otp.$errors"
              />
              <div
                class="w-full flex lg:justify-end justify-start items-center -mt-3 mb-6"
              >
                <button type="button" @click="handleResend">
                  <span
                    class="font-poppins font-medium text-[0.778rem] lg:text-[#4D99FF] text-[#4E8D6E]"
                    >Resend OTP</span
                  >
                </button>
              </div>
              <button
                :disabled="v$.$invalid"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
                @click="handleLogin"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>

        <!-- form footer -->
        <div
          class="max-form w-full absolute bottom-5 lg:flex hidden justify-between items-center"
        >
          <div class="flex">
            <img
              src="../../assets/usa-flag.png"
              class="w-[20px] h-[20px] rounded-full mr-1"
              alt=""
            />
            <select class="border-none text-[#464E5F] text-[12px] font-medium">
              <option value="">English</option>
            </select>
          </div>

          <ul class="flex">
            <li>
              <span
                class="text-success font-poppins font-medium text-[0.778rem] mr-4"
                ><a href="javascript:void(0)">Terms</a></span
              >
            </li>
            <li>
              <span
                class="text-success font-poppins font-medium text-[0.778rem] mr-4"
                ><a href="javascript:void(0)">Plans</a></span
              >
            </li>
            <li>
              <span
                class="text-success font-poppins font-medium text-[0.778rem]"
                ><a href="javascript:void(0)">Contact Us</a></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="lg:w-[50%]">
      <div class="flex justify-center items-center">
        <auth-right-image />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 1023px) {
  .max-form {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    height: 100vh;
    background: linear-gradient(180deg, #4c8a6c 0%, #0b1c14 100%);
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AuthRightImage from "../../components/markup/AuthRightImage.vue";
import TextField from "../../components/reusable/TextField.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import router from "@/router";
import instance from "@/axios-interceptor";

export default defineComponent({
  name: "LoginPageOTP",
  components: {
    AuthRightImage,
    TextField,
  },
  data() {
    return {
      message: "",
    };
  },
  setup() {
    const formData = ref({
      otp: "",
    });

    const rules = {
      otp: { required },
    };
    const v$ = useVuelidate(rules, formData);
    return {
      formData,

      v$,
    };
  },
  methods: {
    handleLogin() {
      if (this.formData.otp !== "") {
        instance
          .post(`2fa/verify/`, {
            token: this.formData.otp,
          })
          .then((response) => {
            if (response) {
             
              router.push({ path: "/dashboard" });
            }
          })
          .catch((error) => {
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          });
      }
    },
    handleResend() {
      instance
        .post(`2fa/`)
        .then((response) => {
          this.$toast.success(response.data.detail, {
            position: "top-right",
          });
        })
        .catch((error) => {
          this.$toast.error(error.response.data.detail, {
            position: "top-right",
          });
        });
    },
  },
});
</script>
