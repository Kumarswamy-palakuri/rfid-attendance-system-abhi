import { useEffect, useState } from "react";
import api from "../services/api";
import ChartCard from "../components/ChartCard";

export default function StudentDashboard() {
  const [summary, setSummary] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/student", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setSummary(res.data.summary);
      setMonthlyData(res.data.monthly);
      setHistory(res.data.history);
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Present Days",
        data: monthlyData.map((item) => item.present),
        borderColor: "rgb(37,99,235)",
        backgroundColor: "rgba(37,99,235,0.5)",
      },
    ],
  };

  return (
    <div className="p-8 space-y-8">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700">
        Student Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Present Days</h2>
          <p className="text-3xl font-bold text-blue-600">
            {summary.totalPresent || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Classes</h2>
          <p className="text-3xl font-bold text-green-600">
            {summary.totalClasses || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Attendance %</h2>
          <p className="text-3xl font-bold text-purple-600">
            {summary.percentage || 0}%
          </p>
        </div>

      </div>

      {/* Monthly Chart */}
      <ChartCard
        title="Monthly Attendance"
        type="line"
        data={chartData}
      />

      {/* Attendance History */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Attendance History
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2 border">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border text-green-600 font-semibold">
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}