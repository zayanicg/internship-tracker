"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  date: string;
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    fetchApplications();

    const savedTasks = localStorage.getItem("reminders");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(tasks));
  }, [tasks]);

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

  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput,
        date: selectedDate.toDateString(),
      },
    ]);

    setTaskInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const tasksForSelectedDate = tasks.filter(
    t => t.date === selectedDate.toDateString()
  );

  const datesWithTasks = tasks.map(t =>
    new Date(t.date).toDateString()
  );

  const tileClassName = ({ date, view }: any) => {
    if (view === "month" && datesWithTasks.includes(date.toDateString())) {
      return "has-reminder";
    }
  };

  const pieData = [
    { name: "Applied", value: applications.filter(a => a.status === "Applied").length },
    { name: "Interviewing", value: applications.filter(a => a.status === "Interviewing").length },
    { name: "Rejected", value: applications.filter(a => a.status === "Rejected").length },
    { name: "Offer", value: applications.filter(a => a.status === "Offer").length },
  ];

  const calendarStyles = `
    .react-calendar {
      border: none;
      font-family: inherit;
    }
    .react-calendar__tile--active {
      background: #6366f1 !important;
      color: white !important;
    }
    .react-calendar__tile--now {
      background: #e0e7ff !important;
      color: #2a2a2a !important;
    }
    .react-calendar__tile.has-reminder {
      background: #fce7f3 !important;
      color: #9d174d !important;
      border-radius: 0.75rem;
      font-weight: 500;
    }
  `;

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#2a2a2a] p-10">
      <style>{calendarStyles}</style>

      <div className="max-w-7xl mx-auto space-y-8">

        <header className="text-center">
          <h1 className="text-4xl font-medium tracking-tight text-gray-800">
            Internship Tracker
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* ADD APPLICATION */}
            <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-3">
                Add Application
              </h2>

              <form onSubmit={addApplication} className="space-y-3">
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Company"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  required
                />
                <input
                  className="w-full p-2 border rounded-lg"
                  placeholder="Role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  required
                />
                <select
                  className="w-full p-2 border rounded-lg"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
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
                  onChange={e => setNotes(e.target.value)}
                />
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                  Add
                </button>
              </form>
            </section>

            {/* QUOTE (LEFT SIDE GAP FILLED) */}
            <div className="text-center">
              <p className="text-gray-500 italic text-sm">
                {quote}
              </p>
            </div>

            {/* REMINDERS */}
            <section className="bg-gray-50 p-6 rounded-2xl shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-2">
                Reminders
              </h2>

              <div className="mb-4 flex justify-center">
                <Calendar
                  onChange={(value) => setSelectedDate(value as Date)}
                  value={selectedDate}
                  tileClassName={tileClassName}
                  className="rounded-xl border-none"
                />
              </div>

              <p className="text-sm text-gray-500 mb-2">
                Reminders for {selectedDate.toDateString()}
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="New reminder..."
                  value={taskInput}
                  onChange={e => setTaskInput(e.target.value)}
                />
                <button
                  onClick={addTask}
                  className="bg-indigo-500 text-white px-3 rounded-lg"
                >
                  Add
                </button>
              </div>

              <ul className="space-y-2 mt-4">
                {tasksForSelectedDate.length === 0 && (
                  <p className="text-sm text-gray-400 italic">
                    No reminders for this day
                  </p>
                )}

                {tasksForSelectedDate.map(task => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center bg-pink-50 border border-pink-100 px-3 py-2 rounded-lg text-sm text-pink-700"
                  >
                    <span>{task.text}</span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-xs text-pink-500 hover:text-pink-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT COLUMN (UNCHANGED) */}
          <div className="space-y-8">

            {/* APPLICATION LIST */}
            <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <h2 className="font-semibold text-lg mb-4">
                Applications ({applications.length})
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {applications.map(app => (
                  <div
                    key={app.id}
                    className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start">

                      <div className="space-y-1">
                        <p className="font-medium text-gray-800">
                          {app.company}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.role}
                        </p>
                        {app.notes && (
                          <p className="text-xs italic text-gray-400 mt-1">
                            {app.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${statusColors[app.status]}`}
                        >
                          {app.status}
                        </span>

                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                        >
                          Delete
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PIE CHART */}
            <section className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center">
              <h3 className="text-center font-semibold mb-4">
                Application Status Overview
              </h3>

              <PieChart width={320} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
