"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  notes: string;
};

const quotes = [
  "Shoot for the stars — progress still counts.",
  "Every application is a step forward.",
  "Growth takes time. Keep going.",
  "You’re building momentum.",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [quote, setQuote] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 🌙 Header */}
        <header className="space-y-1">
          <h1 className="text-4xl font-semibold flex items-center gap-2">
            🌙 Internship Orbit Tracker
          </h1>
          <p className="text-slate-400 italic">{quote}</p>
        </header>

        {/* 📝 Add Application */}
        <section className="bg-white text-slate-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Application</h2>

          <form onSubmit={addApplication} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="border rounded-lg p-3"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

              <input
                className="border rounded-lg p-3"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            <select
              className="border rounded-lg p-3 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Rejected</option>
              <option>Offer</option>
            </select>

            <textarea
              className="border rounded-lg p-3 w-full"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Application
            </button>
          </form>
        </section>

        {/* 📋 Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Your Applications ({applications.length})
          </h2>

          {applications.length === 0 && (
            <p className="text-slate-400">
              No applications yet — your journey starts with one ✨
            </p>
          )}

          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white text-slate-900 rounded-2xl shadow p-5 flex justify-between"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">
                    {app.company} — {app.role}
                  </h3>

                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    {app.status}
                  </span>

                  {app.notes && (
                    <p className="text-sm text-slate-600 mt-2">
                      {app.notes}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteApplication(app.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
