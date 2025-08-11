import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HistoricalChart({ base, target }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    fetch(`https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=${base}&symbols=${target}`)
      .then((res) => res.json())
      .then((data) => {
        const labels = Object.keys(data.rates);
        const rates = labels.map((date) => data.rates[date][target]);
        setChartData({
          labels,
          datasets: [
            {
              label: `1 ${base} to ${target}`,
              data: rates,
              borderColor: 'blue',
              fill: false,
            },
          ],
        });
      });
  }, [base, target]);

  return chartData ? <Line data={chartData} /> : <p>Loading chart...</p>;
}
