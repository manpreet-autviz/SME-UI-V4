<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <input
        :value="modelValue"
        :type="type === 'password' ? passwordTextField : type"
        :name="name"
        :placeholder="placeholder"
        class="w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2"
        :class="[
          showErrors ? 'border-red' : 'border-textFieldBorder',
          classes ? classes : '',
        ]"
        @input="($event) => handleEmitUpdateValue($event)"
      />
      <div
        v-if="type == 'password' || (type === 'text' && showPassword)"
        class="z-10 -ml-8 cursor-pointer h-[1rem]"
        @click="onHideOrShowPassword"
      >
        <img
          v-if="!showPassword"
          src="../../assets/show-password.png"
          alt="eye"
          class=" h-full"
        />
        <img
          v-else
          src="../../assets/hide-password.png"
          alt="eye"
          class="h-full"
        />
      </div>
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
  name: 'TextField',
  props: {
    type: {
      type: String as PropType<string | undefined>,
      default: 'text',
    },
    name: {
      type: String as PropType<string | undefined>,
      required: true,
    },
    placeholder: {
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
  },
  setup() {
    const showPassword = ref(false);
    const passwordTextField = ref('password');
    return {
      showPassword,
      passwordTextField,
    };
  },
  methods: {
    onHideOrShowPassword() {
      this.showPassword = !this.showPassword;
      if (this.passwordTextField === 'password') {
        this.passwordTextField = 'text';
      } else if (this.passwordTextField === 'text') {
        this.passwordTextField = 'password';
      } else {
        return;
      }
    },
    handleEmitUpdateValue(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      return this.$emit('update:modelValue', inputElement.value);
    },
  },
});
</script>
