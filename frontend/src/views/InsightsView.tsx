//@ts-nocheck
import { useEffect, useState } from "react";
import { fetchTexts } from "../services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function InsightsView() {
  const [all, setAll] = useState([]);
  const [interval, setInterval] = useState("day"); // hour, day, week, month
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchTexts(1000)
      .then((data) => setAll(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!all.length) return;

    // Aggregate counts by time interval
    const counts = {};
    all.forEach((item) => {
      const date = new Date(item.timestamp);

      let key;
      switch (interval) {
        case "hour":
          key = date.toISOString().slice(0, 13) + ":00"; // 2025-12-14T15:00
          break;
        case "day":
          key = date.toISOString().slice(0, 10); // 2025-12-14
          break;
        case "week": {
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().slice(0, 10); // week start date
          break;
        }
        case "month":
          key = date.toISOString().slice(0, 7); // 2025-12
          break;
        default:
          key = date.toISOString().slice(0, 10);
      }

      counts[key] = (counts[key] || 0) + 1;
    });

    // Prepare data for chart
    const sortedKeys = Object.keys(counts).sort();
    setChartData({
      labels: sortedKeys,
      datasets: [
        {
          label: "Texts Count",
          data: sortedKeys.map((k) => counts[k]),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
  }, [all, interval]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Texts Insights</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Aggregate by: </label>
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      <div>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: `New Texts per ${interval}`,
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: interval,
                  },
                  title: {
                    display: true,
                    text: "Time",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Count",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
}
