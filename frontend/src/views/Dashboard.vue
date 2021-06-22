<template>
  <div>
    <div class="flex flex-wrap">
      <h3 class="font-semibold text-base text-blueGray-700">
        Dashboard
      </h3>
      <BarChart />
    </div>
  </div>
</template>

<script>
import BarChart from '@/views/BarChart.vue'

export default {
  name: 'Dashboard',
  components: { BarChart },
  data()  {
    return {
    };
  },
}
</script>
