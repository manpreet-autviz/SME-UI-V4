<template>
    <div class="popup-modal">
        <div class="popup-modal-content portal-model rounded-xl">
            <button @click="$emit('close')" class="float-right">
                <img src="../../assets/close-icon.svg" class="w-[0.8rem] mt-1" alt="" />
            </button>
            <div class="bg-white">

                <div
                    class="mx-auto mt-3 grid max-w-2xl grid-cols-1 items-top gap-x-8 px-4  sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:p-5">

                    <div></div>
                    <div>
                        <div class="flex items-center w-full justify-between mb-2">
                            <div>
                                <h3
                                    class="text-left mb-0 font-poppins font-semibold md:text-[15px] text-[0.90rem] text-routersTextColor">
                                    Preview Portal
                                </h3>
                            </div>
                            <div>
                                <span :class="{ active: isActive('desktop') }" @click="toggleActive('desktop')"
                                    class="border-cutom inline-flex cursor-pointer items-center justify-center p-2 w-[40px] bg-[#F3F6F9] rounded-md">
                                    <img src="../../assets/desktop-screen.svg" alt="">
                                </span>
                                <span :class="{ active: isActive('mobile') }" @click="toggleActive('mobile')"
                                    class="ml-2 border-cutom cursor-pointer inline-flex items-center justify-center w-[40px] p-2 bg-[#F3F6F9] rounded-md">
                                    <img src="../../assets/mobile-screen.svg" alt="">
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3
                            class="text-left mb-4 font-poppins font-semibold md:text-[1.062rem] text-[0.90rem] text-routersTextColor">
                            Customize Captive Portal
                        </h3>

                        <dl class=" grid grid-cols-1">
                            <div class="mb-2 relative">
                                <input v-model="name" min="5" id="small-input" placeholder="Upload Logo"
                                    class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder" />
                                <img src="../../assets/upload-file.svg" class="absolute right-2.5 top-2.5 w-[20px]" alt="">
                                <label class="absolute right-2.5 top-1 w-[30px] opacity-0">
                                    <input type="file" class="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100
                                            " />
                                </label>
                            </div>

                            <div class="mb-2 relative">
                                <input v-model="name" type="text" min="5" id="small-input"
                                    placeholder="Upload Background Image"
                                    class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder" />
                                <img src="../../assets/upload-file.svg" class="absolute right-2.5 top-2.5 w-[20px]" alt="">
                                <label class="absolute right-2.5 top-1 w-[30px] opacity-0">
                                    <input type="file" class="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-violet-700
                                            hover:file:bg-violet-100
                                            " />
                                </label>
                            </div>
                            <div class="mb-2">
                                <input v-model="name" type="text" min="5" id="small-input" placeholder="Heading Title"
                                    class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder" />
                            </div>
                            <div class="mb-1">
                                <textarea v-modal="message" id="message" rows="4"
                                    class="text-[14px] w-full h-[5rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                                    placeholder="Description Text"></textarea>
                            </div>
                            <div class="w-full flex text-center">
                                <input v-model="name" type="text" min="5" id="small-input" placeholder="#FFFFFF"
                                    class="text-[14px] w-[40%] mr-3 h-[2.688rem] text-center border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder" />
                                <input v-model="name" type="text" min="5" id="small-input" placeholder="Button color"
                                    class="text-[14px] w-[40%] h-[2.688rem] text-center border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder" />
                            </div>
                            <div class="w-full mt-8">
                                <button type="button"
                                    class="w-full mb-2 font-['poppins'] text-[15px] bg-secondary  text-black  rounded-[0.432rem] px-3 py-2 font-medium">
                                    Preview Portal
                                </button>
                                <button type="button"
                                    class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] px-3 py-2 font-medium">
                                    Save and publish
                                </button>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <div class="grid bg-[#F0F0F0] rounded-lg py-8 px-3 h-full">
                            <img  src="../../assets/black-layer.png"
                                alt="Desktop plus Mobile"
                                :class="{'w-[60%] rounded-3xl bg-gray-100 m-auto h-full object-cover': activeIndex === 'mobile'}">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import instance from "@/axios-interceptor";

export default {
    name: "VoucherForm",
    props: {
        modal: {
            type: Boolean,
        },
    },
    data() {
        return {
         
            showCategoryModal: false,
            realmslist: [
                {
                    id: "",
                    name: "",
                },
            ],
            categorylist: [
                {
                    id: "",
                    name: "",
                },
            ],
            category: "",
            file: null,
            file_type: "Image",
            realm: "",
            status: "Enabled",
            activeIndex: 'desktop',
        };
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },

    methods: {
        isActive(index) {    
            return index === this.activeIndex
        },
        toggleActive(index) {
            console.log(this.activeIndex)
            this.activeIndex = this.activeIndex === index ? '' : index
        }


    }
}
</script>
  