"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  notes: string;
};

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const quotes = [
  "Every application moves you forward.",
  "Consistency builds opportunity.",
  "Progress over perfection.",
  "Small steps create momentum.",
];

const statusColors: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-600 border border-blue-100",
  Interviewing: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  Rejected: "bg-pink-50 text-pink-600 border border-pink-100",
  Offer: "bg-green-50 text-green-600 border border-green-100",
};

const COLORS = ["#bfdbfe", "#fde68a", "#fbcfe8", "#bbf7d0"];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [quote, setQuote] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  const addApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, status, notes }),
    });
    setCompany("");
    setRole("");
    setStatus("Applied");
    setNotes("");
    fetchApplications();
  };

  const deleteApplication = async (id: string) => {
    await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
    fetchApplications();
  };

  // Task logic
  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, done: false }]);
    setTaskInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Prepare data for Recharts pie chart
  const pieData = [
    { name: "Applied", value: applications.filter(a => a.status === "Applied").length },
    { name: "Interviewing", value: applications.filter(a => a.status === "Interviewing").length },
    { name: "Rejected", value: applications.filter(a => a.status === "Rejected").length },
    { name: "Offer", value: applications.filter(a => a.status === "Offer").length },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#2a2a2a] p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-medium tracking-tight text-gray-800">
            Internship Tracker
          </h1>
          <p className="text-gray-500 italic">{quote}</p>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* TOP LEFT - Add Application */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-3">Add Application</h2>
              <form onSubmit={addApplication} className="space-y-3">
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <select
                  className="w-full p-2 border rounded-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Applied</option>
                  <option>Interviewing</option>
                  <option>Rejected</option>
                  <option>Offer</option>
                </select>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                  Add
                </button>
              </form>
            </section>
          </div>

          {/* TOP RIGHT - Applications List */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-4">
                Applications ({applications.length})
              </h2>
              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{app.company} — {app.role}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <button onClick={() => deleteApplication(app.id)} className="text-sm text-red-600">
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* BOTTOM LEFT - Task List */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-3">Tasks</h2>
              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="New task..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <button onClick={addTask} className="bg-indigo-500 text-white px-3 rounded-lg hover:bg-indigo-600 transition">
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 accent-indigo-500"
                      />
                      <span className={task.done ? "line-through text-gray-400" : ""}>
                        {task.text}
                      </span>
                    </label>
                    <button onClick={() => deleteTask(task.id)} className="text-red-600 text-sm">
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* BOTTOM RIGHT - Pie Chart */}
          <div className="flex items-center justify-center">
            {applications.length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
               <PieChart width={250} height={250}>
  <Pie
    data={pieData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    // Remove the label prop
    // label
  >
    {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index]} />
    ))}
  </Pie>
  <Tooltip />   {/* This shows number on hover */}
  <Legend verticalAlign="bottom" height={36} />
</PieChart>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
