<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">Create Account Partner</h6>
        <button
          class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
        >
          CREATE
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form>
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
                value="lucky.jesse"
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
                value="jesse@example.com"
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
                value="Lucky"
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
                value="Jesse"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Rules
        </h6>
        <!-- List Module -->
        <div class="w-full lg:w-12/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="modules"
            >
              Select Modules
            </label>
            
            <div class="flex flex-wrap space-x-4">
              <!-- Duyệt qua các module và tạo checkbox cho mỗi module -->
              <div v-for="mod in modules" :key="mod.id" class="flex items-center mb-4">
                <input
                  type="checkbox"
                  :id="'module-' + mod.id"
                  :value="mod.id"
                  v-model="form.moduleId"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="'module-' + mod.id"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ mod.moduleName }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <!-- List Function -->
        <div class="w-full lg:w-12/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="functions"
            >
              Select Functions
            </label>
            
            <div class="flex flex-wrap space-x-4">
              <!-- Duyệt qua các function và tạo checkbox cho mỗi function -->
              <div v-for="func in functions" :key="func.id" class="flex items-center mb-4">
                <input
                  type="checkbox"
                  :id="'function-' + func.id"
                  :value="func.id"
                  v-model="form.functionId"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  :for="'function-' + func.id"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{ func.functionName }}
                </label>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/api-admin-service";

export default {
  data() {
    return {
      modules: [],
      functions: [],
      errorMessage: '',
      form: {
        moduleId: [],
        functionId: [],
      }
    };
  },
  async created() {
    await this.loadModules();
    await this.loadFunctions();
  },
  methods: {
    async loadModules() {
      const result = await AdminService.getModule();
      this.modules = result;
    },
    async loadFunctions() {
      const result = await AdminService.getFunction();
      this.functions = result;
    },
  },
};
</script>