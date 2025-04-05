<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <search-info-partner />
      </div>
    </div>
  </div>
</template>
<script>
import SearchInfoPartner from "@/components/admin/SearchInfoPartner.vue";
export default {
  name: "dashboard-page",
  components: {
    SearchInfoPartner,
  },
}
</script>
