<template>
  <div class="container mx-auto p-6">
    <!-- Các Input tìm kiếm -->
    <div class="mb-4 flex items-center space-x-4">
      <div class="flex flex-col w-full">
        <label for="partnerName" class="text-gray-700 font-semibold"
          >Tên đối tác</label
        >
        <input
          v-model="formSearchInfo.partnerName"
          id="partnerName"
          type="text"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Tìm kiếm theo tên đối tác"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="address" class="text-gray-700 font-semibold">Địa chỉ</label>
        <input
          v-model="formSearchInfo.address"
          id="address"
          type="text"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Tìm kiếm theo địa chỉ"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="contactEmail" class="text-gray-700 font-semibold"
          >Email</label
        >
        <input
          v-model="formSearchInfo.contactEmail"
          id="contactEmail"
          type="text"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Tìm kiếm theo email"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="contactPhone" class="text-gray-700 font-semibold"
          >Số điện thoại</label
        >
        <input
          v-model="formSearchInfo.contactPhone"
          id="contactPhone"
          type="text"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
          placeholder="Tìm kiếm theo số điện thoại"
        />
      </div>
    </div>

    <!-- Các trường tìm kiếm theo ngày và nút tìm kiếm -->
    <div class="mb-4 flex items-center space-x-4">
      <div class="flex flex-col w-full">
        <label for="fromDate" class="text-gray-700 font-semibold"
          >Từ ngày</label
        >
        <input
          v-model="formSearchInfo.fromDate"
          id="fromDate"
          type="date"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="toDate" class="text-gray-700 font-semibold">Đến ngày</label>
        <input
          v-model="formSearchInfo.toDate"
          id="toDate"
          type="date"
          class="border border-gray-300 px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div class="flex flex-col w-full">
        <label for="Search" class="text-gray-700 font-semibold">Tìm kiếm</label>
        <button
          type="button"
          class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3"
          @click="fetchInfoPartner"
        >
          Tìm kiếm
        </button>
      </div>
    </div>

    <!-- Hiển thị spinner khi đang tải -->
    <div v-if="isLoading" class="flex justify-center items-center py-4">
      <svg
        class="animate-spin h-8 w-8 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        ></circle>
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          d="M4 12a8 8 0 0116 0"
        ></path>
      </svg>
    </div>

    <!-- Bảng kết quả -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th class="px-6 py-3">Tên đối tác</th>
            <th class="px-6 py-3">Địa chỉ</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Số điện thoại</th>
            <th class="px-6 py-3">Ngày tạo</th>
            <th class="px-6 py-3">Ngày ký hợp đồng</th>
            <th class="px-6 py-3">Sửa</th>
            <!-- Cột sửa -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedItems"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td class="px-6 py-4">{{ item.partnerName }}</td>
            <td class="px-6 py-4">{{ item.address }}</td>
            <td class="px-6 py-4">{{ item.contactEmail }}</td>
            <td class="px-6 py-4">{{ item.contactPhone }}</td>
            <td class="px-6 py-4">{{ item.createDate }}</td>
            <td class="px-6 py-4">{{ item.contractSigningDate }}</td>
            <td class="px-6 py-4">
              <button @click="editPartner(item)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 3l5 5-13 13H3v-5L16 3z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Phân trang -->
    <Pagination
      :totalItems="totalItems"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @change-page="changePage"
    />
    <!-- Main modal -->
    <div
      v-if="isModalVisible"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-10\/12 md:inset-0 h-full"
    >
      <div class="relative p-4 w-10\/12 max-w-xs max-h-xs">
        <!-- Chỉnh lại kích thước modal thành vuông -->
        <!-- Modal content -->
        <div
          class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 form-popup"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Chỉnh sửa thông tin đối tác
            </h3>
            <button
              @click="closeModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <!-- Tên đối tác -->
            <div class="mb-4">
              <label class="block text-gray-700">Tên đối tác</label>
              <input
                v-model="selectedPartner.partnerName"
                type="text"
                class="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <!-- Địa chỉ -->
            <div class="mb-4">
              <label class="block text-gray-700">Địa chỉ</label>
              <input
                v-model="selectedPartner.address"
                type="text"
                class="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <!-- Email -->
            <div class="mb-4">
              <label class="block text-gray-700">Email</label>
              <input
                v-model="selectedPartner.contactEmail"
                type="text"
                class="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <!-- Số điện thoại -->
            <div class="mb-4">
              <label class="block text-gray-700">Số điện thoại</label>
              <input
                v-model="selectedPartner.contactPhone"
                type="text"
                class="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
          </div>
          <!-- Modal footer -->
          <div class="flex w-full space-x-4 sm\:ml-1 btn-popup">
            <div class="mb-4">
              <button
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                @click="saveChanges"
              >
                Lưu thông tin
              </button>
            </div>

            <div class="mb-4">
              <button
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                @click="closeModal"
              >
                Huỷ thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/api-admin-service";
import Pagination from "@/components/Pagination.vue"; // Import Pagination component

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      formSearchInfo: {
        partnerName: "",
        address: "",
        contactEmail: "",
        contactPhone: "",
        fromDate: "",
        toDate: "",
      },
      totalItems: 0,
      currentPage: 0,
      pageSize: 10,
      paginatedItems: [],
      isLoading: false, // Thêm biến isLoading để theo dõi trạng thái loading
      isModalVisible: false, // Trạng thái hiển thị modal
      selectedPartner: {}, // Đối tác đang được chỉnh sửa  // Thêm biến isLoading để theo dõi trạng thái loading
    };
  },
  methods: {
    async fetchInfoPartner() {
      this.isLoading = true; // Bật loading
      try {
        this.formSearchInfo.page = this.currentPage;
        this.formSearchInfo.offset = this.pageSize;
        const response = await AdminService.infoPartnerAPI(this.formSearchInfo);
        if (response.status === 0) {
          this.paginatedItems = response.response;
          this.totalItems = response.total;
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        this.isLoading = false; // Tắt loading
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchInfoPartner();
    },
    editPartner(partner) {

      this.isModalVisible = true;
   // Kiểm tra trạng thái của modal
      AdminService.infoPartnerDetailAPI(partner)
        .then((response) => {
          // Nếu API trả về thành công
          if (response) {
            // Cập nhật selectedPartner với dữ liệu từ API
            this.selectedPartner = response; // Gán dữ liệu vào selectedPartner
          } else {
            console.error("Không tìm thấy thông tin đối tác.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error); // Xử lý lỗi API
        });
    },
    openModal(partner) {
      this.selectedPartner = { ...partner }; // Sao chép đối tác vào selectedPartner
      this.isModalVisible = true;
      this.isModalVisible = true;
      AdminService.infoPartnerDetailAPI(partner)
        .then((response) => {
          // Nếu API trả về thành công
          if (response) {
            // Cập nhật selectedPartner với dữ liệu từ API
            this.selectedPartner = response; // Gán dữ liệu vào selectedPartner
          } else {
            console.error("Không tìm thấy thông tin đối tác.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error); // Xử lý lỗi API
        }); // Mở modal
    },
    closeModal() {
      this.isModalVisible = false; // Đóng modal
    },
    saveChanges() {
      // Gửi yêu cầu API để lưu thay đổi
      console.log("Lưu thay đổi:", this.selectedPartner);

      // Nếu bạn muốn gửi yêu cầu API để cập nhật thông tin đối tác
      AdminService.updatePartnerAPI(this.selectedPartner)
        .then((response) => {
          if (response === 0) {
            console.log("Cập nhật thành công.");
          } else {
            console.error("Cập nhật thất bại.");
          }
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật thông tin:", error);
        });

      this.closeModal(); // Đóng modal
      this.fetchInfoPartner();
    },
  },
  mounted() {
    this.fetchInfoPartner();
  },
};
</script>

<style>
.form-popup {
  background: #eeeeee;
}
.btn-popup {
  padding-left: 20px;
}
</style>
