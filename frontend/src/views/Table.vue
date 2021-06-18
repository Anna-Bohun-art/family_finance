<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
    :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
  >
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3
            class="font-semibold text-lg"
            :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
          >
            Report
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >#</th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              date
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              store
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              type
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
            >
              value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          v-for=" (entry, i) in allData" :key="i">
            <td scope="row">{{ ++i }}</td>
            <td>{{ entry.date }}</td>
            <td>{{ entry.store }}</td>
            <td>{{ entry.type }}</td>
            <td>{{ entry.value }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--<TableDropdown/>-->
  </div>
</template>
<script>

export default {
  data() {
    return {
      allData: [],
      color: 'light',
    };
  },
  async created() {
    await this.getEntries();
  },
  
  methods: {
    async getEntries() {
      this.$http.get('http://localhost:8081/api/entry')
      .then((response) => {
        this.allData = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>
<style scoped>
th, td {
  padding: 1rem;
}
th {
  background: #bbbbbb;
}
</style>