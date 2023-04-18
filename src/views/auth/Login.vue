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
              Sign In
            </h1>
            <h1
              class="font-poppins lg:font-bold lg:text-[19px] font-normal text-[15px] mt-2 tracking-widest text-primary text-center"
            >
              ARED SME Platform
            </h1>

            <form class="mt-10">
              <TextField
                name="email"
                class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Email"
                type="email"
                v-model="v$.email.$model"
                :showErrors="v$.email.$errors.length ? true : false"
                :errors="v$.email.$errors"
              />
              <TextField
                name="password"
                class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Password"
                type="password"
                v-model="v$.password.$model"
                :showErrors="v$.password.$errors.length ? true : false"
                :errors="v$.password.$errors"
              />
              <div
                class="w-full flex lg:justify-end justify-start items-center -mt-3 mb-6"
              >
                <button type="button" @click="handleForgotPassword">
                  <span
                    class="text-success font-poppins font-medium text-[0.778rem] lg:text-[#4D99FF] text-[#4E8D6E]"
                    >Forgot Password?</span
                  >
                </button>
              </div>
              <button
                :disabled="v$.$invalid || loading"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
                @click="handleLogin"
              >
              {{ loading ? 'Logging In...' : 'Login' }}
              </button>
              <div class="w-full flex justify-center items-center my-6">
                <span
                  class="font-poppins font-normal text-[#838282] text-[12.9px]"
                  >Don't have an account yet?
                  <button
                    type="button"
                    class="text-success font-semibold lg:text-[#4D99FF] text-[#4E8D6E]"
                    @click="handleSignup"
                  >
                    Sign up
                  </button></span
                >
              </div>
            </form>
          </div>
        </div>

        <!-- form footer -->
        <div
          class="max-form w-full absolute bottom-5 justify-between items-center lg:flex hidden"
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
import { required, email } from "@vuelidate/validators";
import router from "@/router";
import axios from "axios";
import API_URL from "@/config";
import instance from "@/axios-interceptor";

export default defineComponent({
  name: "LoginPage",
  components: {
    AuthRightImage,
    TextField,
  },
  data() {
    return {
      loading:false,
      message: "",
    };
  },
  setup() {
    const formData = ref({
      email: "",
      password: "",
    });
    const rules = {
      email: { required, email },
      password: { required },
    };
    const v$ = useVuelidate(rules, formData);
    return {
      formData,
      v$,
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.formData.email !== "" && this.formData.password !== "") {
        API_URL.post(`auth/jwt/create/`, {
          phone: this.formData.email,
          password: this.formData.password,
        })
          .then((response) => {
            if (response) {
              const token = response.data.access;

              localStorage.setItem("access_token", token);
              instance
                .post(`2fa/`)
                .then((res) => {
                  this.loading = false;
                  this.$toast.success(res.data.detail, {
                    position: "top-right",
                  });
                  router.push({ path: "/otp" });
                })
                .catch((error) => {
                  this.loading = false;
                  this.$toast.error(error.response.data.detail, {
                    position: "top-right",
                  });
                });
            }
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          });
      }
    },

    handleSignup() {
      router.push({ path: "/signup" });
    },
    handleForgotPassword() {
      router.push({ path: "/forgot-password" });
    },
  },
});
</script>
