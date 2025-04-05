<template>
  <div class="container mx-auto p-6">
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
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-6 py-3">Tên đối tác</th>
            <th class="px-6 py-3">Địa chỉ</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Số điện thoại</th>
            <th class="px-6 py-3">Ngày tạo</th>
            <th class="px-6 py-3">Ngày ký hợp đồng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedItems" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <td class="px-6 py-4">{{ item.partnerName }}</td>
            <td class="px-6 py-4">{{ item.address }}</td>
            <td class="px-6 py-4">{{ item.contactEmail }}</td>
            <td class="px-6 py-4">{{ item.contactPhone }}</td>
            <td class="px-6 py-4">{{ item.createDate }}</td>
            <td class="px-6 py-4">{{ item.contractSigningDate }}</td>
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
  </div>
</template>

<script>
import AdminService from "@/services/api-admin-service";
import Pagination from "@/components/Pagination.vue";  // Import Pagination component

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
      isLoading: false,  // Thêm biến isLoading để theo dõi trạng thái loading
    };
  },
  methods: {
    async fetchInfoPartner() {
      this.isLoading = true;  // Bật loading
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
        this.isLoading = false;  // Tắt loading
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchInfoPartner();
    },
  },
  mounted() {
    this.fetchInfoPartner();
  },
};
</script>
