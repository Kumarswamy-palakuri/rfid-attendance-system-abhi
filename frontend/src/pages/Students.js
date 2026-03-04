import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll_number: "",
    department: "",
    rfid_card: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/students/${editId}`, form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else {
        await api.post("/students", form, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      }

      setForm({
        name: "",
        roll_number: "",
        department: "",
        rfid_card: "",
        email: "",
      });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await api.delete(`/students/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-8">

      <h1 className="text-2xl font-bold text-gray-700">
        Manage Students
      </h1>

      {/* Student Form */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Edit Student" : "Add New Student"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="roll_number"
            placeholder="Roll Number"
            value={form.roll_number}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="rfid_card"
            placeholder="RFID Card UID"
            value={form.rfid_card}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Student Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded md:col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition md:col-span-2"
          >
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>

      {/* Student Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Student List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">RFID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id} className="text-center">
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.roll_number}</td>
                    <td className="border px-4 py-2">{student.department}</td>
                    <td className="border px-4 py-2">{student.rfid_card}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-400 px-3 py-1 rounded text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-600 px-3 py-1 rounded text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No students found
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