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

  // ⭐ Pick a random quote on load
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    fetchApplications();
  }, []);

  // ✅ GET applications
  const fetchApplications = async () => {
    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
  };

  // ✅ POST application
  const addApplication = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        role,
        status,
        notes,
      }),
    });

    setCompany("");
    setRole("");
    setStatus("Applied");
    setNotes("");

    fetchApplications();
  };

  // ✅ DELETE application
  const deleteApplication = async (id: string) => {
    await fetch(`/api/applications?id=${id}`, {
      method: "DELETE",
    });

    fetchApplications();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* 🌙 Header */}
      <div>
        <h1 className="text-3xl font-bold">
          🌙 Internship Orbit Tracker
        </h1>
        <p className="text-gray-600 mt-1">{quote}</p>
      </div>

      {/* 📝 Form */}
      <form
        onSubmit={addApplication}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="border rounded p-2"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />

          <input
            className="border rounded p-2"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <select
          className="border rounded p-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <textarea
          className="border rounded p-2 w-full"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Application
        </button>
      </form>

      {/* 📋 Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold">
                {app.company} — {app.role}
              </h2>
              <p className="text-sm text-gray-600">
                Status: {app.status}
              </p>
              {app.notes && (
                <p className="text-sm mt-1">{app.notes}</p>
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
    </div>
  );
}
