<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-12/12 px-4">
      <CreatePartnerForm />
    </div>
  </div>
</template>
<script>
import CreatePartnerForm from "@/components/admin/CreatePartnerForm.vue";


export default {
  components: {
    CreatePartnerForm,

  },
};
</script>
