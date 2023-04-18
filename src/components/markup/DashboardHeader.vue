<template>
  <div class="w-full flex items-center justify-between my-6">
    <div class="flex flex-col  block md:hidden">
      <div class="min-w-[10vw] flex items-center justify-between relative">
        <img
           src="../../assets/avatar.png"
            alt="africa"
            class="w-[2rem] h-[2rem] rounded-[1rem]"
          />
          <div class="flex flex-col items-start justify-start mx-2">
            <span class="text-textLight font-medium text-[0.60rem] font-poppins"
              >Hello</span
            >
            <span class="font-semibold text-[0.60rem] font-poppins text-black"
              >{{ full_name }}
            </span>
          </div>
         
      </div>
    </div>
    <div class="flex flex-col md:block hidden">
      <div class="flex items-center">
        <img
          :src="icon"
          alt="africa"
          class="w-[1.1rem] h-[1.2rem] rounded mr-1"
        />
        <span
          class="font-poppins font-semibold md:text-[1.062rem] text-[0.90rem] text-routersTextColor"
          >{{ title }}</span
        >
      </div>
      <span
        v-if="description"
        class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]"
        >{{ description }}</span
      >
    </div>
    <slot name="aside"></slot>
  </div>
</template>
<script lang="ts">
import instance from '@/axios-interceptor';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DashboardHeader',
  data(){
    return{
      full_name:''
    }
  },
  props: {
   
    title: {
      type: String as PropType<string>,
      required: true,
    },
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    description: {
      type: String as PropType<string>,
      required: false,
    },
  },
  methods:{
    getuserData() {
      instance.get(`auth/users/me/`)
        .then((response: { data: any; }) => {  
          this.full_name = response.data.full_name;
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getuserData();
  }
});
</script>
