# Project Descrption

Company X is actively hiring across multiple roles. Their entire recruitment process runs on spreadsheets and paper notes — hiring managers update a shared Excel file by hand, and there's no single source of truth.

The result: candidates fall through the cracks. Someone forgets to update a stage, an email never gets sent, or a promising CV gets buried in an inbox. By the time anyone notices, the candidate has moved on.

They need a simple web application where the hiring team can see every open role, drill into each one, and manage candidates through a visual pipeline — dragging cards from stage to stage as the process moves forward. Every action should be timestamped so nothing gets lost or forgotten.

---


# Prompts for Company X Hiring System (Backend)

1. Project Initialization & Environment
Prompt: Initialize a Node.js project using Express.js. Create a folder structure following a standard REST API pattern (controllers, models, routes, middleware, config). Install express, mongoose, dotenv, jsonwebtoken, bcryptjs, and cors. Create a .env file template with variables for PORT, MONGO_URL, and JWT_SECRET.

2. Authentication & Security
Prompt: Create a User model with name, email (unique), and password fields. Implement a JWT-based authentication system. Create an authMiddleware.js to protect routes and a userController.js for register and login functions. Ensure passwords are hashed using bcryptjs before saving.

3. Database Schema Design (Mongoose)
Prompt: Define the following Mongoose schemas based on the requirements:

# Job Schema: title, department, activeCandidateCount (virtual or calculated).

Candidate Schema: name, photoUrl, roleAppliedFor (ref to Job), email, currentStage (enum: Applied, Shortlisted, Interviewing, In Assessment, Accepted, Rejected), history (array of objects: stage, timestamp).

History Note: Every time the currentStage changes, a new entry must be pushed to the history array with the current date/time.

4. Screen 1: Jobs Dashboard
Prompt: Create a jobController.js and a GET route /api/jobs. This should return all open positions. For each job, calculate the number of candidates whose status is NOT 'Rejected' to display as the activeCandidateCount.

5. Screen 2: Candidate Pipeline (Kanban Logic)
Prompt: Create a GET route /api/jobs/:jobId/candidates. This should return all candidates linked to a specific job ID.

Create a PATCH route /api/candidates/:candidateId/stage. This route should:

- Update the currentStage.

- Append a new object to the history array with the new stage and a Date.now() timestamp.

- Restriction: If a candidate's status is already 'Rejected', do not allow them to be moved back into the pipeline.

6. Screen 3: Candidate Detail
Prompt: Create a GET route /api/candidates/:id. It should return the full candidate profile, including the history array sorted by timestamp so the hiring manager can see the chronological trail of the recruitment process.

7. Screen 4: Rejected Archive
Prompt: Create a GET route /api/candidates/rejected. This should fetch all candidates across all jobs where the currentStage is 'Rejected'. Include the name, the job they applied for, the stage they were rejected at (the second to last entry in their history), and the rejection timestamp.

8. Validation & Error Handling
Prompt: Create a global error handling middleware for the Express app. Add request validation for the Candidate stage update to ensure the newStage value is one of the allowed enum values (Applied, Shortlisted, etc.).