<template>
  <div
    class="font-poppins font-normal text-sm bg-dark w-[26.063rem] min-h-[2.688rem] z-50 fixed left-5 bottom-5 border-2 border-primary flex justify-between items-center px-6 py-3 rounded-md drop-shadow-2xl"
  >
    <span class="text-primary text-center max-w-[80%]">{{ message }}</span>
    <button type="button" class="text-red" @click="handleCloseSnackbar">
      close
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SmeSnackbar',
  props: {
    message: {
      type: String as PropType<string>,
      default: 'Sme Snackbar',
    },
  },
  methods: {
    handleCloseSnackbar() {
      this.$emit('buttonClick');
    },
  },
});
</script>
