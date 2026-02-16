# 📊 Internship Tracker Dashboard

A full-stack internship application tracker with real-time status visualization, calendar reminders, and rotating motivational quotes. Built with Next.js, TypeScript, Supabase, and Tailwind CSS to demonstrate production-style dashboard architecture, API design, and data-driven UI updates.

Designed as a recruiter-ready portfolio project focused on clean full-stack patterns, derived state, and practical dashboard UX.

---

## 🌟 Highlights

* ⚡ Full-stack Next.js App Router architecture
* 🗄️ PostgreSQL database integration with Supabase
* 🔌 REST-style API routes (GET / POST / DELETE)
* 📈 Real-time status visualization with charts
* 🗓️ Calendar-based reminder system
* 💬 Rotating motivational quotes on each load
* 🔄 Automatic UI refresh after mutations
* 🧠 Derived state for analytics and visualization
* 🎨 Clean, structured dashboard UI
* 🚀 Deployed on Vercel

---

## 🎯 Why I Built This

I built this project to replace spreadsheet-based internship tracking with a structured, visual dashboard that makes progress, outcomes, and follow-ups easier to manage. The goal was to practice real-world full-stack architecture while delivering a clean, usable interface with meaningful data visualization and small UX enhancements.

---

## 🧭 Typical Workflow

1. Add a new internship application
2. Assign its current status (Applied, Interviewing, Rejected, Offer)
3. See the status distribution update instantly in the chart
4. Add reminder dates for follow-ups or deadlines
5. Use the dashboard and calendar to track progress

---

## 🧩 Core Features

### 📬 Application Management

* Create and delete internship applications
* Track application status across defined stages
* Persistent storage in PostgreSQL via Supabase
* Server-side operations handled through API routes
* Automatic dashboard refresh after create/delete actions

### 📊 Status Visualization

* Pie chart showing distribution by application status
* Chart data derived from live database records
* Fully state-driven — no hardcoded metrics
* Updates automatically when records change

### 🗓️ Date-Linked Reminder System

* Interactive calendar interface
* Reminders tied to selected dates
* Visual indicators for reminder days
* Per-day reminder filtering
* Local persistence using localStorage
* Normalized date comparison logic

### 💬 Motivational Quote Rotation

* Random motivational quote displayed on each page load
* Lightweight feature designed to improve user experience without adding complexity
* Quotes selected from a predefined set using randomized selection logic
* Demonstrates conditional rendering and client-side state initialization

---

## 🏗 Data Flow Architecture

The application follows a clean full-stack request cycle:

Client → API Route → Database → Response → UI State Update

* API routes handle reads and mutations
* Supabase manages persistent storage
* Derived state powers chart visualization
* React state drives UI synchronization
* Mutations trigger automatic re-fetch and refresh

---

## 🧠 Engineering Concepts Demonstrated

* Full-stack App Router implementation
* CRUD operations through API routes
* Database policy debugging and access control
* Async data fetching and UI synchronization
* Derived state transformation for charts
* Date-based filtering logic
* Component-based dashboard layout
* Client-side persistence with localStorage
* Incremental refactoring and feature expansion

---

## 🛠 Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Recharts
* React Calendar

**Backend**

* Next.js API Routes
* Supabase
* PostgreSQL

**Deployment**

* Vercel

---

## 🚀 Live Demo

Live App: **[Add Vercel Link]**
Repository: **[Add GitHub Link]**

---

## ⚙️ Run Locally

```bash
git clone https://github.com/yourusername/internship-tracker.git
cd internship-tracker
npm install
npm run dev
```

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_KEY
```

---

## 📂 Project Structure (Simplified)

```
app/
  api/
    applications/
components/
lib/
  supabaseClient.ts
```

* API routes handle database operations
* UI components remain presentation-focused
* Data logic separated from layout components

---

## 🔮 Planned Improvements

* ✏️ Edit/update application records
* 🔐 Authentication and user accounts
* ☁️ Server-side reminder storage
* 🔎 Filtering and search tools
* 📱 Mobile layout optimization

---

## 📸 Screenshots

> Store images in `docs/images/` (or similar) and update paths below.

### Dashboard Overview

<img src="docs/images/dashboard.png" width="800"/>

### Status Chart

<img src="docs/images/chart.png" width="800"/>

### Reminder Calendar

<img src="docs/images/calendar.png" width="800"/>

---

## 🤝 Feedback & Contributions

Suggestions and improvements are welcome.
Open an issue or submit a pull request if you’d like to contribute.

If you found this project useful or interesting, consider giving it a ⭐

---

## 👤 Author

Portfolio full-stack project focused on dashboard architecture, data visualization, and production-style Next.js patterns.
