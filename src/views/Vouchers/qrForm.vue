<template>
  <div class="popup-modal">
    <div class="popup-modal-content rounded-xl">
      <button @click="$emit('close')" class="float-right">
        <img src="../../assets/close-icon.svg" class="w-[0.8rem] mt-1" alt="" />
      </button>
      <div class="row">
        <div class="col-md-12 mx-auto text-center">
          <button
            @click="printWindow()"
            class="mx-auto mb-2 bg-[#4E8D6D] text-[#fff] md:px-6 px-4 py-2 rounded-[0.327rem] flex items-center"
          >
            Print
          </button>
          <h4 class="mb-3 text-[#000] text-[14px]">Code:{{ QRnumber }}</h4>
          <div class="flex justify-center">
            <QRCode :size="300" class="w-[100%]" :value="QRnumber" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode.vue";
export default {
  name: "VoucherForm",
  components: {
    QRCode,
  },
  props: {
    QRnumber: {
      type: Number,
    },
  },

  methods: {
    printWindow() {
      window.print();
    },
  },
};
</script>
<style>
.qrcode {
  margin: 20px;
  border: 1px solid #ccc;
}
</style>
