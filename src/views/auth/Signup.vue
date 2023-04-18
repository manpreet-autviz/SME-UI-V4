<template>
  <div class="w-full lg:flex justify-between">
    <div class="lg:w-[50%] h-100vh md:overflow-auto lg:py-10">
      <div class="flex flex-col justify-center items-center relative"> 
        <div class="max-form w-full lg:py-0 py-10">
          <img src="../../assets/ared-logo.svg" class="w-[8rem] lg:hidden block m-auto mb-5" alt="right view" />
          <div class="bg-white rounded-[0.432rem] lg:p-0 p-4">
          <h1 class="font-['poppins'] font-bold text-[26px] text-center">Sign Up</h1>
          <h1 class="font-poppins lg:font-bold font-normal lg:text-[19px] text-[15px] mt-2 tracking-widest text-primary text-center">
            ARED SME Platform
          </h1>
          <form class="mt-10">
            <TextField
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              name="firstName" placeholder="First Name" type="text" v-model="v$.firstName.$model"
              :showErrors="v$.firstName.$errors.length ? true : false" :errors="v$.firstName.$errors" />
            <TextField name="lastName"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              placeholder="Last Name" type="text" v-model="v$.lastName.$model"
              :showErrors="v$.lastName.$errors.length ? true : false" :errors="v$.lastName.$errors" />
            <TextField name="email"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              placeholder="Email" type="email" v-model="v$.email.$model"
              :showErrors="v$.email.$errors.length ? true : false" :errors="v$.email.$errors" />
            <TextField name="password"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              placeholder="Password" type="password" v-model="v$.password.$model"
              :showErrors="v$.password.$errors.length ? true : false" :errors="v$.password.$errors" />
            <TextField name="phone"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              placeholder="Phone Number" type="text" v-model="v$.phone.$model"
              :showErrors="v$.phone.$errors.length ? true : false" :errors="v$.phone.$errors" />
            <SelectField name="partner"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              label="Select Partner" v-model="v$.partner.$model" :showErrors="v$.partner.$errors.length ? true : false"
              :errors="v$.partner.$errors" :data="partners" />
            <SelectField name="subscription"
              class="mb-5 font-normal border-none border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
              label="Select Subscription" v-model="v$.subscription.$model"
              :showErrors="v$.subscription.$errors.length ? true : false" :errors="v$.subscription.$errors"
              :data="subscriptions" />
            <button type="button"
              class="w-full bg-secondary font-['poppins'] text-[15px] text-black rounded-[0.432rem] p-3 font-semibold mb-3 mt-4"
              @click="handleSignIn">
              Cancel
            </button>
            <button type="button"
              class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
              @click="handleSignup" :disabled="v$.$invalid">
              Add SME
            </button>
            <div class="w-full flex justify-center items-center my-6">
              <span class="font-poppins font-normal text-[#838282] text-[12.9px]">Already have an account?
                <button type="button" class="text-success font-semibold lg:text-[#4D99FF] text-[#4E8D6E]" @click="handleSignIn">
                  Sign In
                </button></span>
            </div>
          </form>
        </div>
        </div>

        <!-- form footer -->
        <div class="max-form w-full bottom-5 lg:flex hidden justify-between items-center">
          <div class="flex ">
            <img src="../../assets/usa-flag.png" class="w-[20px] h-[20px] rounded-full mr-1" alt="">
            <select class="border-none text-[#464E5F] text-[12px] font-medium">
              <option value="">English</option>
            </select>
          </div>

          <ul class="flex">
            <li><span class="text-success font-poppins font-medium text-[0.778rem] mr-4"><a
                  href="javascript:void(0)">Terms</a></span></li>
            <li><span class="text-success font-poppins font-medium text-[0.778rem] mr-4"><a
                  href="javascript:void(0)">Plans</a></span></li>
            <li><span class="text-success font-poppins font-medium text-[0.778rem]"><a href="javascript:void(0)">Contact
                  Us</a></span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="lg:w-[50%]">
      <div class="flex justify-center items-center">
        <auth-right-image />
      </div>
      <SmeSnackbar v-if="showSnackbar"
        message="Successfully registered as sme, kindly use credentials sent to your email to login to your dashboard account."
        @buttonClick="handleCloseSnackbar" />
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width:1023px){
   .max-form {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    background: linear-gradient(180deg, #4C8A6C 0%, #0B1C14 100%);
}
}
</style>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthRightImage from '../../components/markup/AuthRightImage.vue';
import TextField from '../../components/reusable/TextField.vue';
import SelectField from '../../components/reusable/SelectField.vue';
import SmeSnackbar from '../../components/reusable/Snackbar.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import router from '@/router';

export default defineComponent({
  name: 'SignupPage',
  components: {
    AuthRightImage,
    TextField,
    SmeSnackbar,
    SelectField,
  },
  setup() {
    const formData = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      partner: '',
      subscription: '',
    });
    const partners = ref([
      { id: 1, name: 'ARED Uganda SMC' },
      { id: 2, name: 'ARED Rwanda' },
      { id: 3, name: 'ARED Uganda SMC' },
      { id: 4, name: 'Partner Robert - Test 2' },
    ]);
    const subscriptions = ref([
      { id: 1, name: 'Starter' },
      { id: 2, name: 'Plus' },
      { id: 3, name: 'Pro' },
      { id: 4, name: 'Pro +' },
    ]);
    const showSnackbar = ref(false);
    const rules = {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        containsPasswordRequirement: helpers.withMessage(
          () =>
            `The password requires an uppercase, lowercase, number and special character`,
          (value: string) =>
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
        ),
      },
      phone: { required },
      partner: { required },
      subscription: { required },
    };
    const v$ = useVuelidate(rules, formData);
    return {
      formData,
      showSnackbar,
      v$,
      partners,
      subscriptions,
    };
  },
  methods: {
    handleSignup() {
      if (
        this.formData.firstName !== '' &&
        this.formData.lastName !== '' &&
        this.formData.email !== '' &&
        this.formData.password !== '' &&
        this.formData.phone !== '' &&
        this.formData.partner !== '' &&
        this.formData.subscription !== ''
      ) {

        this.showSnackbar = true;
        this.formData.firstName = '';
        this.formData.lastName = '';
        this.formData.email = '';
        this.formData.password = '';
        this.formData.partner = '';
        this.formData.subscription = '';
        setTimeout(() => {
          this.handleSignIn();
        }, 3000);
      }
    },
    handleCloseSnackbar() {
      this.showSnackbar = false;
    },
    handleSignIn() {
      router.push({ path: '/' });
    },
  },
});
</script>
