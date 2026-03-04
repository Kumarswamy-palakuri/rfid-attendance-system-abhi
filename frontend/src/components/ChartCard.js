import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartCard({ title, type, data, options }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy old chart instance if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(canvasRef.current, {
      type: type || "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: type === "pie" ? true : false
          }
        },
        ...options
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, options]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        {title}
      </h2>
      <div className="relative h-60">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}