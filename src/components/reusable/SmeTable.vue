<template>
  <div class="table-responsive w-full mt-3">
  <div class="overflow-auto table w-full">
    <div
      class="bg-[#F3F6F9] rounded-[0.337rem] items-center text-[#B5B5C3] font-poppins font-semibold text-[0.673rem] table-layout-tr table-th"
    >
 
      <td class="text-[#464E5F] capitalize">{{ tableName }}</td>
      <td v-for="item in tableHeaderData" :key="item">{{ item }}</td>

    </div>
    <slot name="tableBodyData"></slot>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SmeTable',
  props: {
    tableHeaderData: {
      type: Array as PropType<any[]>,
      required: true,
    },
    tableName:{
      type: String as PropType<string>,
        required: true, 
    }
  },
  methods: {
    //
  },
});
</script>
