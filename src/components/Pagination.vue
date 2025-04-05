<template>
  <div class="flex justify-center mt-4">
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:opacity-50"
      :disabled="currentPage === 0"
      @click="changePage(currentPage - 1)"
    >
      Trước
    </button>
    <span class="mx-4">
      Trang {{ currentPage + 1 }} / {{ totalPages }}
    </span>
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:opacity-50"
      :disabled="currentPage === totalPages - 1"
      @click="changePage(currentPage + 1)"
    >
      Sau
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.$emit('change-page', page);
      }
    },
  },
};
</script>