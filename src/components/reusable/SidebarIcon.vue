<template>
  <button
    type="button"
    class="w-[4.313rem] flex items-center justify-center flex-col p-3 rounded-[0.438rem] mb-2"
    :class="[classes ? classes : '', isActive ? 'shadow-lg bg-white ' : '']"
    @click="onSetActive(routePath)"
  >
    <img :src="icon" alt="africa" class="w-[1.188rem] h-[1.188rem] mb-1" />
    <span class="text-textDark font-semibold text-[10px] text-[#414354] font-poppins mt-1">{{
      title
    }}</span>
    
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'SidebarIcon',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    routePath:{
      type: String as PropType<string>,
      required: true,
    },
    classes: {
      type: String as PropType<string>,
      required: false,
    },
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    isActive: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    //
  },
  methods: {
    onSetActive(path:string) {

      this.$emit('click');
      this.$router.push(path);
    },
  },
});
</script>
