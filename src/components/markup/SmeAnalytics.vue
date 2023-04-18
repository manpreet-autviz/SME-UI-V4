<template>
  <div
    class="bg-white lg:w-[49%] min-h-[21.432rem] rounded-[0.938rem] py-3 px-6 shadow lg:mb-0 mb-5"
  >
    <span class="font-poppins font-semibold md:text-[1.01rem] text-[0.8rem] text-[#212121]"
      >Analytics</span
    >
    <div class="flex justify-between items-center">
      <span class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]"
        >New Users joined to ared network</span
      >
      <div class="flex items-center">
        <button
          v-for="item in changeLabelsArr"
          :key="item.id"
          class="mx-1 font-poppins text-[0.556rem] font-semibold w-[2.828rem] h-[1.576rem] flex items-center justify-center rounded-[0.278rem]"
          :class="
            item.id === currentButton
              ? 'bg-[#3F4254] text-[#FFFFFF]'
              : 'text-[#B5B5C3] '
          "
          @click="handleCurrentButton(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
    <div class="w-full flex justify-center items-center">
      <Line
        id="my-chart-id"
        :options="chartOptions"
        :data="
          currentButton === 2
            ? chartData
            : currentButton === 3
            ? chartDataWeek
            : chartDataYear
        "
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  labelsMonth,
  datasetsMonth,
  changeLabels,
  labelsWeek,
  datasetsWeek,
  labelsYear,
  datasetsYear,
} from '../../helpers/stub_data/charts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  name: 'SmeAnalytics',
  components: { Line },
  setup() {
    const chartData = ref({
      labels: labelsMonth,
      datasets: datasetsMonth,
    });
    const chartOptions = ref({
      responsive: true,
    });
    const chartDataWeek = ref({
      labels: labelsWeek,
      datasets: datasetsWeek,
    });
    const chartDataYear = ref({
      labels: labelsYear,
      datasets: datasetsYear,
    });
    const changeLabelsArr = ref<any[]>(changeLabels);
    const currentButton = ref<number>(2);
    return {
      chartData,
      chartOptions,
      changeLabelsArr,
      currentButton,
      chartDataWeek,
      chartDataYear,
    };
  },
  methods: {
    handleCurrentButton(id: number) {
      this.currentButton = id;
    },
  },
});
</script>
