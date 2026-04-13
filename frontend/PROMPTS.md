# Company X Hiring Platform - Frontend Prompts (Vite + React + Tailwind)

1. Project Setup & Global Styling

Prompt: Initialize a React app using Vite. Install tailwindcss, postcss, autoprefixer, lucide-react (for icons), and axios. Configure Tailwind with a custom color palette based on the design:

Background: #F8F5F0 (cream)

Primary Accent: #D94A38 (burnt orange)

Typography: System serif for headings, sans-serif for body.
Set up a global Layout component with a navigation bar containing "Company X · Hiring" and links for "Jobs", "Archive", and "AI Policy".

2. API Service Layer

Prompt: Create an api.js utility using Axios. Configure a base URL using import.meta.env.VITE_API_URL. Include an interceptor to attach the JWT token from localStorage to every request. Create functions for:

getJobs(), getJobCandidates(jobId), updateCandidateStage(id, stage), getCandidateDetail(id), and getRejectedArchive().

3. Screen 1: Jobs Dashboard

Prompt: Create a JobsDashboard component. Fetch all jobs from the backend. Display them in a responsive grid using Tailwind.

Each card should show: "SCREEN 01" label (small, orange), Job Title (Serif font), Department, and a badge for "Active Candidates".

Clicking a card should navigate to /jobs/:id using react-router-dom.

4. Screen 2: Candidate Pipeline (Kanban)

Prompt: Create a CandidatePipeline component. Implement a horizontal scrollable kanban board with 5 columns: "Applied", "Shortlisted", "Interviewing", "In Assessment", "Accepted".

Use @hello-pangea/dnd (or native HTML5 Drag and Drop) for movement.

On a successful drop:

Optimistically update local state.

Call the backend PATCH API to persist the stage change.

If the API fails, revert the state and show a custom toast notification.

Cards should show the candidate's name and a placeholder photo.

5. Screen 3: Candidate Detail (Slide-over or Page)

Prompt: Create a CandidateDetail component. It should fetch data based on the ID in the URL.

Left Side: Profile info (Name, Photo, Role, Date Applied).

Right Side: A vertical timeline representing the history array from the backend.

Each timeline node must show the Stage Name and a formatted timestamp (e.g., "Oct 12, 2:30 PM").

Style the "Current Stage" with a distinct highlight.

6. Screen 4: Rejected Archive

Prompt: Create a RejectedArchive component. Fetch candidates with the 'Rejected' status.

Present them in a clean, read-only list or table.

Columns: Name, Original Role, Rejection Stage, and Date/Time of Rejection.

Logic: Ensure these cards do NOT have drag-and-drop handles, as they are archived.

7. Authentication Flow

Prompt: Create a Login page. On successful login, store the JWT in localStorage and redirect to the Jobs Dashboard. Wrap the main application routes in a ProtectedRoute component that checks for the existence of a token.

8. Final Polish & Responsiveness

Prompt: Review all components and ensure:

All buttons have hover states.

Loading skeletons or spinners are shown during API fetches.

The layout is fully responsive (Stacking kanban columns on mobile if necessary).

Empty states are handled (e.g., "No active candidates in this stage").