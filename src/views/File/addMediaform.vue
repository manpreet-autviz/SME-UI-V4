<template>
  <div class="popup-modal">
    <div class="popup-modal-content rounded-xl">
      <button @click="$emit('close')" class="float-right">
        <img src="../../assets/close-icon.svg" class="w-[0.8rem] mt-1" alt="" />
      </button>
      <div class="row">
        <div class="col-md-12 mx-auto">
          <h3
            class="text-left mb-4 font-poppins font-semibold md:text-[1.062rem] text-[0.90rem] text-routersTextColor"
          >
            Add Media
          </h3>
          <form>
            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Realms:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="realm"
                v-model="realm"
                required
              >
                <option value="">Select Realm</option>
                <option
                  v-for="realmItem in realmslist"
                  :key="realmItem.id"
                  :value="realmItem.id"
                >
                  {{ realmItem.name }}
                </option>
              </select>
            </div>

            <div>
              <div class="flex justify-between items-center my-2">
                <label
                  for="small-input"
                  class="mb-0 text-sm font-medium text-gray-900 dark:text-white"
                  >Category</label
                >
                <button
                  type="button"
                  @click="showCategoryModal = true"
                  @close="closeModal()"
                  class="px-3 flex items-center font-['poppins'] text-[12px] bg-primary text-white rounded-[0.432rem] py-2 font-medium"
                >
                  <img
                    src="../../assets/plus-icon.png"
                    class="w-[0.6rem] mr-1"
                    alt=""
                  />
                  New Category?
                </button>
              </div>
              <addCategoryForm
                v-if="showCategoryModal"
                @close="closeCategoryModal()"
              ></addCategoryForm>
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="realm"
                v-model="category"
                required
              >
                <option value="">Select Category Realm</option>
                <option
                  v-for="category in categorylist"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="my-2">
              <label
                for="small-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >File Type</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                v-model="file_type"
                required
                id="small-input"
              >
                <option value="Image">Image</option>
                <option value="Video">Video</option>
                <option value="App">App</option>
              </select>
            </div>
            <label
              for="small-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >File</label
            >
            <input
              id="file"
              ref="fileInput"
              type="file"
              placeholder="Choose a file or drop it here..."
              class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
            />
            <div
              class="w-full flex lg:justify-end justify-start items-center mt-3"
            >
              <button
                @click="addMedia"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
              >
                Add Media
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import instance from "@/axios-interceptor";
import addCategoryForm from "./addCategoryForm";
export default {
  name: "VoucherForm",
  components: {
    addCategoryForm,
  },
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
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  mounted() {
    this.getRealms();
    this.getCategories();
  },
  methods: {
    getRealms() {
      instance
        .get(`realms/?sme=${this.loggedInUser.sme}`)
        .then((response) => {
          this.realmslist = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    closeModal() {
      this.showModal = false;
      this.getFilesData();
    },

    closeCategoryModal() {
      this.showCategoryModal = false;
      this.getCategories();
    },
    getCategories() {
      instance
        .get(`categories/?realm__sme=${this.loggedInUser.sme}`)
        .then((response) => {
          this.categorylist = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async addMedia() {
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("category", this.category);
      formData.append("file_type", this.file_type);
      formData.append("realm", this.realm);
      formData.append("status", this.status);

      await instance
        .post(`files/`, formData)
        .then((response) => {
          if (response.status === 201) {
            this.$toast.success("Media file is created Sucessfully", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.detail, {
            position: "top-right",
          });
        });
    },
  },
};
</script>
