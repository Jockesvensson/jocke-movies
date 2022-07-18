import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ movies }) => {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  useEffect(() => {
    const ratingArray = movies.map((obj, index) => obj.newRating);

    const counts: any[] = [];
    ratingArray.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    const completedRatingArray = counts.slice(1, 11);

    setChartData({
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [
        {
          label: "rating chart",
          backgroundColor: [
            "rgba(255, 51, 51, 0.7)",
            "rgba(255, 153, 51, 0.7)",
            "rgba(255, 255, 51, 0.7)",
            "rgba(153, 255, 51, 0.7)",
            "rgba(51, 255, 51, 0.7)",
            "rgba(51, 255, 153, 0.7)",
            "rgba(51, 255, 255, 0.7)",
            "rgba(51, 153, 255, 0.7)",
            "rgba(51, 51, 255, 0.7)",
            "rgba(255, 51, 255, 0.7)",
          ],
          borderColor: [
            "rgba(255, 51, 51, 0.7)",
            "rgba(255, 153, 51, 0.7)",
            "rgba(255, 255, 51, 0.7)",
            "rgba(153, 255, 51, 0.7)",
            "rgba(51, 255, 51, 0.7)",
            "rgba(51, 255, 153, 0.7)",
            "rgba(51, 255, 255, 0.7)",
            "rgba(51, 153, 255, 0.7)",
            "rgba(51, 51, 255, 0.7)",
            "rgba(255, 51, 255, 0.7)",
          ],
          borderWidth: 1,
          data: completedRatingArray,
        },
      ],
    });
  }, [movies]);

  return (
    <div className="max-w-6xl mx-auto mt-2 xsm:mt-4 px-4">
      <Doughnut
        data={chartData}
        width={"40%"}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default LineChart;
