<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
          Create Account Partner
        </h6>
        <button
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          @click="handleCreatePartner"
        >
          CREATE
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form ref="formAddPartner">
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="partnerName"
              >
                Partner Name
              </label>
              <input
                type="text"
                id="partnerName"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="formAddPartner.partnerName"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="formAddPartner.contactEmail"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="formAddPartner.address"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                v-model="formAddPartner.contactPhone"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/api-admin-service";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      modules: [],
      functions: [],
      errorMessage: "",
      formAddPartner: {
        partnerName: "",
        address: "",
        contactEmail: "",
        contactPhone: "",
      },
    };
  },

  methods: {
    async handleCreatePartner() {
      const result = await AdminService.addPartnerAPI(this.formAddPartner);
      if (result.data.status === 400) {
        // Lấy ra message
        const errorMessage = result.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage, // Thông báo lỗi từ API
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Partner added successfully!",
        }).then(() => {
          // Xoá form rồi điều hướng
          this.$refs.formAddPartner.reset();
          // Sau khi người dùng nhấn OK, điều hướng sang trang /admin/dashboard
          this.$router.push("/admin/dashboard");
        });
        this.modules = result;
      }
    },
  },
};
</script>