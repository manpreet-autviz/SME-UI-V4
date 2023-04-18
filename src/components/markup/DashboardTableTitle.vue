<template>
  <div>
    <div class="flex w-full justify-between items-center font-semibold">
      <slot name="section"></slot>
      <div
        class="md:flex block items-center justify-around min-w-[16vw] text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]"
      >
        <span class="md:flex hidden"
          >{{ pageNumber }} - {{ totalPages }} of {{ totalPages }}</span
        >
        <div class="flex">
          <button :disabled="(pageNumber === 1)"
            class="flex items-start justify-start mr-3"
            v-on:click="handlePrev()"
          >
            <span class="mr-1 mt-0.4">&#8249;</span> <span>prev</span>
          </button>
          <button :disabled="totalItems"
            class="flex items-start justify-start"
            v-on:click="handleNext()"
          >
            <span>next</span><span class="ml-1 mt-0.4">&#8250;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DashboardTableTitle",
  props: {
    ApiData: {
      type: Object as PropType<any>,
      required:true
    },
    pageNumber:{
      type :[String, Number] as PropType<string | number>
    },
    perPageItems:{
      type:[String] as PropType<any>
    }
  },
 computed:{
  totalItems (){
   
    return  this.pageNumber as number * this.perPageItems >=this.ApiData?.length
  },
  totalPages(){
    return Math.ceil(this.ApiData?.length /  this.perPageItems as number )

  }
 },

  methods: {
    handleNext() {
      this.$emit("handleNext");
    },
    handlePrev() {
      this.$emit("handlePrev");
    },
  },
});
</script>
