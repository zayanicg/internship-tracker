"use client";

import { useState, useEffect } from "react";

type Application = {

  id: string;
  company: string;
  role: string;
  status: string;
  notes: string;

};

export default function ApplicationsPage() {

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  // get applications when the page loads
  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {

    const res = await fetch("/api/applications");
    const data = await res.json();
    setApplications(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company, role, status, notes }),
      });
      

    setCompany("");
    setRole("");
    setNotes("");
    setStatus("Applied");

    fetchApplications();
  }

  async function handleDelete(id: string) {

    await fetch(`/api/applications?id=${id}`, {
      method: "DELETE",
    });

    fetchApplications();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">🌿 Internship Growth Tracker</h1>
      <p className="text-gray-600 mt-2">
        Track your applications and grow your career one step at a time.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Application</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>

      {/* APPLICATION LIST */}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Applications</h2>

        {applications.map((app) => (
          <div key={app.id} className="bg-white p-4 mb-3 rounded shadow flex justify-between">
            <div>
              <p className="font-bold">{app.company}</p>
              <p className="text-sm text-gray-600">{app.role}</p>
              <p className="text-sm">Status: {app.status}</p>
              <p className="text-sm italic">{app.notes}</p>
            </div>

            <button
              onClick={() => handleDelete(app.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>

        ))}
      </div>
    </div>
  );
}
