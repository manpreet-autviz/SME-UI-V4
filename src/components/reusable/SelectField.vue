<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <select
        :name="name"
        class="w-full h-[2.688rem] border-[0.063rem] rounded-[0.625rem] px-3 py-2 placeholder-textFieldColor text-textFieldColor outline-none focus:outline-none"
        :class="[
          showErrors ? 'border-red' : 'border-textFieldBorder',
          classes ? classes : '',
        ]"
        @input="($event) => handleEmitUpdateValue($event)"
      >
        <option disabled selected value>{{ label }}</option>
        <option v-for="opt in data" :key="opt.id" :value="opt.id">
          {{ opt.name }}
        </option>
      </select>
    </div>
    <div v-if="showErrors">
      <span v-for="(error, index) in errors" class="text-red text-[12px]" :key="index">{{
        error.$message
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'SelectField',
  props: {
    name: {
      type: String as PropType<string | undefined>,
      required: true,
    },
    label: {
      type: String as PropType<string | undefined>,
      required: true,
    },
    classes: {
      type: String as PropType<string | undefined>,
      required: false,
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    showErrors: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    errors: {
      type: Array as PropType<any[]>,
      required: true,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [{ id: 1, name: 'ARED Uganda SMC' }],
    },
  },
  setup() {
    //
  },
  methods: {
    handleEmitUpdateValue(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      return this.$emit('update:modelValue', selectElement.value);
    },
  },
});
</script>
