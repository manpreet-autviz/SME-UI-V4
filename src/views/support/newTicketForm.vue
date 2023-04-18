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
            Create New Ticket
          </h3>
          <form>
            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Subject:</label
              >

              <input
                v-model="subject"
                type="text"
                id="small-input"
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
              />
            </div>
            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Department:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="department"
                v-model="department"
                required
              >
                <option value="">Select Department</option>
                <option value="Router">Router</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Priority:</label
              >
              <select
                class="text-[14px] w-full h-[2.688rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                id="department"
                v-model="priority"
                required
              >
                <option value="">Select Priority:</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div class="mb-1">
              <label
                for="small-input"
                class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mb-1"
                >Message:</label
              >

              <textarea
                v-modal="message"
                id="message"
                rows="4"
                class="text-[14px] w-full h-[5rem] border-[0.063rem] bg-white rounded-[0.625rem] px-3 py-2 border-textFieldBorder"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <div
              class="w-full flex lg:justify-end justify-start items-center mt-3"
            >
              <button
                @click="newTicket"
                type="button"
                class="w-full font-['poppins'] text-[15px] bg-primary text-white rounded-[0.432rem] p-3 font-medium"
              >
                Create New Ticket
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
export default {
  name: "VoucherForm",

  props: {
    modal: {
      type: Boolean,
    },
  },
  data() {
    return {
      subject: "",
      department: "",
      priority: "",
      message: "",
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },

  methods: {
    async newTicket() {
      const newTicket = {
        subject: this.subject,
        department: this.department,
        priority: this.priority,
        message: this.message,
      };
      await instance
        .post(`tickets/`, newTicket)
        .then((response) => {
          if (response.status === 201) {
            this.$toast.success("Ticket submitted, we'll get back to you as soon as possible.", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          if (error.response.data.detail) {
            this.$toast.error(error.response.data.detail, {
              position: "top-right",
            });
          } else {
            this.$toast.error("Could not create media at this time", {
              position: "top-right",
            });
          }
        });
    },
  },
};
</script>
