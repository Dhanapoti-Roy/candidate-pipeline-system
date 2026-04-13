# Company X Hiring System (Backend)

## Overview
A backend REST API using Node.js, Express, and MongoDB for managing candidate pipelines. 

## Data Models
- **User**: Authentication for hiring managers.
- **Job**: Open positions.
- **Candidate**: Applicant personal details.
- **Application**: Links a Candidate to a Job and tracks `currentStage`.
- **StageHistory**: Timestamps log of every stage change for an Application.

## Stage Transition Constraints
The API strictly enforces allowed stage transitions to prevent nonsensical moves. Attempting an invalid move will result in a 400 Bad Request error.

| Current Stage   | Allowed Next Stages                    |
|-----------------|----------------------------------------|
| `Applied`       | `Shortlisted`, `Rejected`              |
| `Shortlisted`   | `Interviewing`, `Rejected`             |
| `Interviewing`  | `In Assessment`, `Accepted`, `Rejected`|
| `In Assessment` | `Accepted`, `Rejected`                 |
| `Accepted`      | *(none)*                               |
| `Rejected`      | *(none)*                               |

## Endpoints Summary
- `GET /api/jobs` - List all jobs with active candidate counts.
- `GET /api/jobs/:jobId/applications` - Get one job's candidate applications.
- `GET /api/applications/:id` - Get one application with full stage history.
- `PATCH /api/applications/:id/stage` - Update an application's stage (strictly validated).
- `GET /api/applications/rejected` - List all rejected applications.
