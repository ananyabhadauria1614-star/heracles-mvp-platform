# Heracles - Full-Stack Automated Identity Verification MVP

Heracles is a high-fidelity Minimum Viable Product (MVP) built to showcase a secure, modern full-stack onboarding architecture. The system features a fully responsive frontend linked to a high-performance backend microservice that automates user identification security checks via cloud infrastructure.

## 🚀 Public Submission Coordinates
* **GitHub Repository Link:** https://github.com
* **Walkthrough Video Walkthrough:** [PASTE_YOUR_WALKTHROUGH_VIDEO_LINK_HERE]

---

## 🛠️ System Architecture & Technology Stack

### 1. Frontend Core (React.js)
* **Single Page Layouts:** Built dynamic state containers handling registration pipelines and responsive UI transitions seamlessly.
* **Global Session Memory:** Leveraged browser local storage maps to persist and recover explicit authentication headers (`unverified`, `pending`, `verified`, `failed`) gracefully across views.
* **Asynchronous Lifecycles:** Implemented a non-blocking `setInterval` engine that background-polls the local API every 3 seconds to update user layouts in real-time.

### 2. Backend Engine (FastAPI & Python)
* **High-Performance Routing:** Provisioned lightweight, asynchronous RESTful entry hooks to parse multi-part form data payloads and image streams cleanly.
* **Fault-Tolerant Triage:** Embedded robust try-except catch matrices providing seamless server fallback protections so third-party dropouts never disrupt the user workflow.

### 3. Cloud Infrastructure & Databases
* **Supabase Cloud Database:** Configured database architectures with a relational `documents` schema connected via server hooks, completely avoiding Row-Level Security (RLS) cache latency for real-time validation checks.
* **External Cloud OCR Service:** Connected to the enterprise OCR.space API via asynchronous `httpx` multi-part file payloads to evaluate document validity dynamically without overloading local compute systems.

---

## 🗂️ Database Schema Mapping (`documents` table)

| Column Name | Data Type | Purpose |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | Generates unique sequence strings for each upload entry record |
| `user_id` | `uuid` (Foreign Key) | Connects the verification log straight to the matching user profile account |
| `document_type` | `text` | Preserves tracking data on selected ID card types |
| `status` | `text` | Transitions dynamically across: `unverified` -> `pending` -> `verified` / `failed` |
| `front_url` | `text` | Holds reference mappings for identity card front layers |
| `back_url` | `text` | Holds reference mappings for identity card reverse layers |
| `selfie` | `text` | Reference slot for biometric capture files |

---

## 🏃‍♂️ Core Operational Workflow Walkthrough

1. **User Sign-up & Sign-In Layer:** Creates or matches credentials directly across database layers, recovering session variables on login handshakes.
2. **Strict File Validation Gate:** Forces frontend validations checking that Front ID, Back ID, and Selfie files all exist in local state before unlocking submission.
3. **Microservice Processing Loop:** Forwards document byte arrays to cloud parsers, evaluates string outputs against structural keyword tags, and mutates Supabase table status rows.
4. **Dynamic Feed Refinement:** Real-time polling shifts layout screens from warning banners into secure, unrestricted home streams automatically based on background database state updates.
