# Heracles MVP Prompt History (note for the examiner:- I have pasted all prompts used here as I am unable to retireve the old ones.)

---

# Starting Prompt

S — Situation

I am building a mobile-first React application called Heracles using React (JSX), Vite, and plain CSS.

The application is a safety-first social platform focused on verified identities and safer online interactions.

I already have the React/Vite project structure ready.

The application must look like a premium iPhone 15 mobile app prototype with clean spacing, rounded inputs, soft grayscale UI, large typography, and minimal modern design.

I want all screens to visually match the uploaded reference screenshots exactly in structure, spacing, alignment, and styling.

The app should feel like a polished startup MVP suitable for presentation in a university assignment and investor demo.

C — Challenge

The current project is inconsistent in styling and screen structure.

Some screens have uneven spacing, inconsistent typography, and different button styles.

I need the UI to become fully cohesive and visually consistent across every onboarding and verification screen.

The application must also preserve a clean mobile-only centered layout without breaking on desktop browsers.

A — Aspiration

I want a premium, minimal, modern onboarding flow that feels similar to Instagram, Airbnb, and Apple onboarding experiences.

The UI should:

* be mobile-first
* fit perfectly inside iPhone 15 dimensions
* use soft grayscale backgrounds
* use large bold headings
* use rounded input fields and buttons
* maintain consistent spacing and typography
* preserve accessibility and clean readability
* feel trustworthy and safety-oriented

The onboarding flow should guide the user from account creation into identity verification and finally into the verified social feed experience.

F — Functionality

Create the following React JSX screens:

1. Welcome Screen

* Heracles logo/title centered
* subtitle: "safer us for a safer you"
* primary black button: Create your account
* secondary outlined button: Login

2. Create Profile Screen

* Full Name
* Username
* Email
* Password
* Upload Profile Photo
* Back button
* Continue button
* Terms and policy footer

3. Login Screen

* Email/Username
* Password
* Forgot Password link
* Back button
* Continue/Login button
* Signup redirect footer

4. Forgot Password Screen

* lock icon
* title: Trouble logging in?
* recovery description text
* username/email input
* Send Login Link button
* Back to Login text

5. Verify Identity Screen

* selectable ID type cards:

  * Driver's Licence
  * Passport
  * National ID
  * Residence Permit/Visa
* Back button
* Continue button

6. Upload Documents Screen

* upload front of ID
* upload back of ID
* selfie capture button
* Back button
* Submit for verification button

7. Verification Failure Screen

* red status pill
* title: Verification unsuccessful
* retry messaging
* Back button
* Try Again button

8. Home Feed Screen

* top navigation
* stories section
* verified user post
* bottom navigation tabs
* clean Instagram-inspired layout

Navigation Requirements:

* maintain existing React navigation structure
* use state-based screen switching
* no React Router required
* buttons should navigate properly between screens

Styling Requirements:

* use a single shared CSS system
* maintain consistent spacing
* rounded corners
* grayscale palette
* black primary buttons
* responsive mobile-centered design
* fit properly on iPhone 15 screens

Do NOT:

* add backend
* add databases
* add authentication APIs
* add Tailwind
* add TypeScript
* change file structure unnecessarily

Keep the implementation frontend-only.

F — Format

Generate:

* clean JSX screen files
* reusable CSS styling
* updated App.jsx navigation logic
* maintain readable component structure
* preserve mobile-first centered phone layout


---

# Follow-Up Prompt 1

Expand the Heracles MVP into a dual-feed trust architecture.

The application should now support TWO separate home feed experiences:

1. Verified Home Feed
2. Unverified Home Feed

VERIFIED HOME FEED REQUIREMENTS:

* premium and calm visual feel
* “Trusted Community” messaging
* verified badges beside usernames
* only verified users visible
* cleaner and safer environment aesthetic
* subtle UI indicators showing protected access
* premium creator-focused experience

UNVERIFIED HOME FEED REQUIREMENTS:

* public/open social environment
* informational banner encouraging verification
* messaging such as:
  “Verify your identity to access the trusted community.”
* lower-trust environment styling
* some verified content/cards can appear locked or inaccessible

Update the onboarding flow to support both verified and unverified user journeys.

On the “Verify your identity” screen:

Add a secondary option:
“Proceed Unverified”

This option should navigate to a new informational screen explaining what unverified access means.

Create a new screen called:
UnverifiedAccess.jsx

The screen should include:

1. Title
   “Proceed as Unverified?”

2. Explanation text
   Explain that unverified users:

* cannot access the verified community feed
* are invisible to verified users
* may experience reduced visibility and trust
* have limited platform protections

3. Benefits of verification section
   Include short bullet points:

* Access to trusted community
* Verified badge
* Safer interactions
* Higher visibility
* Trusted creator status

4. Two buttons
   Primary button:
   “Continue Unverified”

Secondary button:
“Go Back and Verify”

Navigation Logic:

* successful verification → VerifiedHome.jsx
* proceeding unverified → UnverifiedHome.jsx
* “Continue Unverified” → opens Unverified Home Feed
* “Go Back and Verify” → returns to VerifyIdentity screen

Do NOT use React Router.
Maintain existing state-based navigation structure.

Maintain:

* grayscale premium UI
* iPhone 15 mobile-first layout
* rounded modern UI
* minimal startup aesthetic
* consistent spacing and typography

Do not redesign onboarding screens unnecessarily.
Only extend the platform architecture cleanly.


Purpose:
Improved the user interface, added two paths in the onboarding stage, first to experience the app as a verified user, and other as an unverified user.


---

# Follow-up Prompt 2 — fixing the UI and workflow logic

Follow-Up Prompt 2 — UI corrections, upload interactions, and verification submission logic

Please update the existing Heracles MVP without changing the overall app concept or file structure.

Do not rebuild the whole app.
Only apply the following targeted improvements.

1. Welcome Screen
- Remove the circular “A” logo from the first screen.
- Keep only:
  - Heracles title
  - tagline: “safer us for a safer you”
  - Create your account button
  - Login button
- Keep the same clean iPhone-style layout.

2. Create Account / Create Profile Screen
- Center-align the “Create your account” page title.
- Keep the back arrow at the top left.
- Keep the add photo circle.
- When the user clicks “Add photo”, open the device file picker so the user can choose a picture from their device.
- Add more vertical spacing between the Password input field and the Continue button.
- Keep the Terms of Service and Privacy Policy text at the bottom.
- Make sure clicking “Sign up” from the Login screen navigates directly to this Create Profile screen.

3. Verify Identity Screen
- Keep the current ID type card design.
- Add a secondary “Proceed Unverified” option below the Continue button.
- Add a subtle divider with “OR”.
- Clicking “Proceed Unverified” should navigate to the UnverifiedAccess screen.
- The primary Continue button should continue the verified flow to Upload Documents.

4. Upload Documents Screen
- Center-align the “Upload documents” heading.
- Keep the back arrow at the top left.
- Make “Front of ID” clickable and open the device photo/file picker.
- Make “Back of ID” clickable and open the device photo/file picker.
- Make “Take a selfie” open the device camera using a file input with capture enabled.
- Keep the visual upload boxes minimal with dashed borders.
- Do not add backend upload functionality; just simulate file selection in the frontend.

5. Add New Submitted for Verification Screen
Create a new screen called:
VerificationSubmitted.jsx

This screen should appear after the user clicks “Submit for verification”.

It should include:
- A calm status icon or check-style visual
- Title: “Profile submitted for verification”
- Subtitle: “We are reviewing your documents. This usually takes less than 2 minutes.”
- Button: “Continue”
- Continue button should lead to the appropriate outcome screen based on mock verification logic.

6. Mock Verification Logic
Implement simple frontend-only mock logic:
- Keep track of verification submission attempts.
- Every third submission attempt should lead to the Verification Unsuccessful screen.
- Other attempts should lead to the Verified Home Feed.
- This is only for demonstration purposes.
- Add a short code comment explaining this mock logic.

Example:
Attempt 1 → submitted page → verified home
Attempt 2 → submitted page → verified home
Attempt 3 → submitted page → verification unsuccessful
Attempt 4 → submitted page → verified home

7. Verification Unsuccessful Screen
- Keep the unsuccessful screen.
- It should appear only on every third verification submission attempt.
- Try Again should return to Upload Documents.
- Back should return to Verify Identity.

8. Login / Welcome Back Screen
- Fix the “Forgot Password?” text because it is currently overlapping with the password field.
- Place it clearly below the password input, aligned to the right, with enough spacing.
- Clicking “Forgot Password?” should navigate to ForgotPassword screen.
- Clicking “Sign up” should navigate directly to Create Profile screen.

9. General UI Requirements
- Maintain the premium grayscale iPhone 15 aesthetic.
- Keep rounded cards, soft grey backgrounds, black primary buttons, and clean typography.
- Keep spacing consistent.
- Do not add Tailwind, TypeScript, backend, database, or authentication APIs.
- Keep everything frontend-only and beginner-friendly.
- Preserve state-based navigation. Do not use React Router.

At the end, tell me:
1. which files were changed
2. which new files were created
3. how the upload/file picker simulation works
4. how the “every third attempt fails” logic works

Purpose: This follow-up prompt refined the visual layout, fixed navigation issues, added realistic device upload interactions, and introduced mock verification outcome logic for demonstration.

---

# Follow-up Prompt 3 


On the “Profile submitted for verification” screen:

1. Horizontally center-align the green tick/check icon at the top of the page.
2. Center-align the text:
   “We are reviewing your documents. This usually takes less than 2 minutes.”
3. Keep the heading “Profile submitted for verification” centered exactly as it is.
4. Do not change spacing, font sizes, button styling, navigation, or screen flow.
5. Only fix the alignment issue for the icon and the paragraph text.

Purpose: to centre align tick/check icon and the text

# Follow-up Prompt 4 


Create a new screen called `UnverifiedTerms.jsx`.

Purpose:
This screen explains what happens when a user proceeds without identity verification.

Design requirements:

* Match the existing minimal iPhone-style UI
* Light grey background
* Black headings
* Muted grey body text
* Rounded black CTA button
* Mobile-first layout
* Keep spacing consistent with other screens

Screen content:

Heading:
“Proceed Unverified”

Subheading:
“By proceeding unverified, you acknowledge that certain visibility, interaction, and trust features may be restricted under Heracles safety policies.”

Add a rounded light-grey information card containing these bullet points:

• Verified users will not see your posts
• You will only access the public community
• Trust and visibility features will be limited
• Unverified content remains separated from the verified community
• You can verify your identity later at any time
• You will not see verified users’ posts and cannot interact with verified users’ content

Add two buttons at the bottom:

Primary black button:
“Continue Unverified”
→ navigates to the Unverified Home Feed

Secondary outlined/light button:
“Go Back”
→ returns to Verify Identity screen

Implementation requirements:

1. Create the new file:
   `src/screens/UnverifiedTerms.jsx`

2. Add navigation support in App.jsx

3. Update the Verify Identity screen:

   * Under the “Proceed Unverified” button
   * Add small muted grey clickable text:
     “Terms of proceeding unverified”

4. Make the text clickable and navigate to:
   `UnverifiedTerms.jsx`

5. Styling for the text:

* center aligned
* subtle/legal-link style
* small font size
* slightly underlined or lower opacity

6. Do NOT change the current “Proceed Unverified” button behaviour.

7. Preserve all existing navigation, spacing, grayscale premium UI, and mobile-first styling.

Do not redesign other screens.


Purpose: added terms of unverified user, and create a new page listig all terms and link it to create account page. Gives user an option to create an account on the app unverified, increases the number of users while maintaining a saftey wall. 


# Follow-up Prompt 5 

Update the Create Profile / Create your account screen.

Add a small text section at the bottom of the page below the Continue button:

“Already have an account? Log in”

UI requirements:

* Center align the text
* Use muted grey for “Already have an account?”
* Make “Log in” darker/bold and clickable
* Match the styling used elsewhere in the app
* Keep spacing clean and mobile-first

Interaction requirements:

* Clicking “Log in” should navigate directly to the Login screen
* Preserve all existing styling, layout, and navigation flow
* Do not redesign the form fields or buttons


Purpose: identified a missing button than should rediret user to log in screen, if they already have an account, fixed it in this.


# Assignment 3 – Prompt Engineering Log

---

# BUS4012: Vibe Coding — AI Interaction & Prompt Log

**Student Name:** Ananya Babdauria

**Project GitHub Repository:** [PASTE_YOUR_GITHUB_REPOSITORY_URL_HERE]

**Deployment / Local Stack Ports:**

* Frontend (React): localhost:5173
* Backend (FastAPI): localhost:8000

---

# 🛠️ Phase 1: Environment Triage & Port Conflict Resolution

## Objective

Resolve system environment crashes where the Python FastAPI backend failed to spin up due to port availability conflicts, local path configuration drops, and missing multipart form libraries.

## Core Prompts Executed

### Prompt 1

```text
The backend server is failing to run with uvicorn due to a '[Errno 48] Address already in use' error on port 8000. Please clear the process occupying port 8000, verify if python-multipart is installed properly in the virtual environment, start the backend server on port 8000, and ensure that the React frontend in CreateProfileScreen.jsx can successfully submit the form to http://localhost:8000/auth/signup without hanging.
```

### Prompt 2

```text
The backend is throwing an error because the current directory is already inside the 'api' folder. Please adjust the directory path to 'heracles-mvp' or run uvicorn locally as 'index:app' to initialize the server context cleanly.
```

## Outcome

* Cleaned process hooks via local port termination flags.
* Installed required dependencies (`python-multipart`).
* Verified end-to-end local routing pipeline across ports 5173 and 8000.

---

# 🗄️ Phase 2: Database Layer Configuration (Supabase Integration)

## Objective

Design and implement a relational database schema to hold automated user identity verification data points securely, bypassing Row-Level Security (RLS) policies for presentation testing.

## Core Prompts Executed

### Prompt 1

```text
The document upload endpoint is failing with a Supabase database error: 'new row violates row-level security policy'. Please verify if the backend is using the SUPABASE_SERVICE_ROLE_KEY instead of the ANON_KEY to bypass RLS, or help me write a quick script to fix the RLS policies for this table.
```

### Prompt 2

```text
The backend is throwing an RLS or database error when I click 'Submit for verification' on the Upload documents screen. Please check the backend route that handles document uploads, see what table and columns it is trying to insert into, and make sure it handles it properly or help me structure the missing table.
```

## Engineered Schema Model

A dedicated documents table was provisioned inside the Supabase schema using the following architectural structures:

* id (uuid, Primary Key, Default: gen_random_uuid())
* user_id (uuid, Foreign Key linking to authenticated profiles)
* document_type (text data tracking card variations)
* status (text handling validation states: verified / unverified / pending)
* front_url (text link tracker matching image uploads)
* back_url (text link tracker matching image uploads)
* selfie (text placeholder layout mapping)

---

# ☁️ Phase 3: Cloud Microservice Integration (OCR.space API)

## Objective

Incorporate a production-grade external Optical Character Recognition (OCR) microservice to execute real-time document data scanning. This limits local compute consumption and avoids heavy local environment C++ compilations (pytesseract/easyocr).

## Core Prompt Executed

```text
Please completely implement our core document verification system by updating the frontend and backend files. We have isolated our scope to match our exact frontend screen choices: "Driver's Licence", "Passport", "National ID", or "Residence Permit/Visa". We are NOT implementing facial recognition or selfie verification logic for this sprint.

Here are the exact requirements to execute:

1. BACKEND INTEGRATION (backend/api/index.py):
- Update or create the POST endpoint at '/auth/upload-documents'.
- Ensure it accepts four explicit incoming multipart form-data parameters: 'user_id' (Form string), 'document_type' (Form string), 'front_image' (File upload), and 'back_image' (File upload).
- Read the incoming 'front_image' file stream as raw bytes.
- Dispatch an outward POST request to the external OCR.space Cloud API.
- Pass the required multipart payloads.
- Extract ParsedResults -> ParsedText.
- Convert the text to lowercase.
- Scan the string for keywords:
["passport", "licence", "license", "identity", "drivers", "card"].
- If a keyword matches, set status = "verified".
- Otherwise set status = "unverified".
- Write the evaluation row into the Supabase documents table.
- Wrap the execution inside a try-except block.

2. FRONTEND ROUTING INTEGRATION:
- Preserve selected ID type state.
- Pass selectedIdType to the upload screen.
- Append:
formData.append('document_type', selectedIdType)
- Map files to front_image and back_image.
- Redirect verified users to the success screen.
- Show the failure layout for unverified users.
```

## Architectural Implementation & Fallback Safety

The final pipeline successfully establishes cross-origin parameters (CORS), hooks into the external cloud OCR loop using asynchronous network requests (httpx), checks string responses against key arrays, and leverages a fault-tolerant try-except wrapper.

---

# 🔐 Phase 4: Security Enhancements, Error Controls & Visual Flow Polish

## Objective

Clean up validation blockers on secondary pages, implement secure generic reset handling, build a development bypass for grading walkthrough restrictions, and add multi-state layout logic on the Home feed component.

---

## Prompt 1: Password Reset Regex & Visual Spacing Correction

```text
Let's fix the password recovery layout security flow.

Please modify the 'Trouble logging in?' component:

1. Replace the local text condition with a clean standard regular expression (Regex) format validation block. It must accept any properly structured email input string.

2. When the user hits the 'Send Login Link' button, do NOT display explicit user data existence errors. Instead:

- Temporarily set a loader state.
- Display a generic message:

"If this email matches an active account, a recovery link has been dispatched to your inbox."

- Trigger a 2-second setTimeout handler.
- Automatically push the user back into the primary login screen view.

3. Fix the alignment and spacing of the elements on this screen. Ensure the lock icon, headings, helper text, input field, error/success messages, and button have consistent vertical spacing and match the quality of the login page.
```

---

## Prompt 2: Presentation Login Bypass

```text
The login route is returning 'Invalid login credentials' for my test user profile.

Let's add a robust presentation bypass/fallback directly in the login endpoint within backend/api/index.py to ensure our submission walkthrough video is completely stable.

Please update the login route:

1. Perform the standard Supabase check.

2. If the database check fails, add a fail-safe condition.

3. Automatically return a successful login payload, including the matching user_id, a mock token, and set the verification_status flag cleanly so the React frontend logs in instantly and pushes to the main dashboard.
```

---

## Prompt 3: Three-State Home Screen Dynamic Banner Logic

```text
Let's refine the home screen card banner logic.

Implement three verification states:

- "unverified"
- "pending"
- "verified"

Scenario A:
Display the shield icon, "Verify your identity", and the Get Verified button.

Scenario B:
Display:

- Orange loading icon.
- Header: "Verification Pending"
- Description:
"Our microservice is scanning your document layers. Your account will automatically unlock once approved."

Hide the Get Verified button.

Scenario C:

Hide the entire white card container once the user becomes verified.
```

---

## 🔐 Phase 4: Error Controls, Security Guards & Dynamic UI Polishing

### Objective
Clean up validation blockers on accessory screens, design fallback routes for authentication limits, establish real-time UI states for pending users, and implement session state cross-referencing during login.

### Core Prompts Executed

#### 1. Password Reset Input Regex Validation & Layout Alignment
```text
Let's fix the password recovery layout security flow. Please modify the 'Trouble logging in?' component: 
1. Replace the local text condition with a clean standard regular expression (Regex) format validation block. It must accept any properly structured email input string (e.g., 'ana@gmail.com'). 
2. When the user hits the 'Send Login Link' button, do NOT display explicit user data existence errors. Instead, simulate a secure password-reset protocol hook.
3. LAYOUT CORRECTION: Fix the alignment and spacing of the elements on this screen. Ensure the lock icon, headings, helper text, input field, error/success messages, and the primary 'Send Login Link' button have beautiful, consistent vertical spacing (padding/margins), are perfectly centered, and match the high-quality look of the login page.
```

#### 2. Local Stack Validation & Frontend State Retention Blockers
```text
Let's fix the screen transition states, add strict frontend form validation, and ensure data persistence across our components.
Please modify the code files to implement the following rules:
1. STRICT FORM VALIDATION (Upload Documents Screen): Add an explicit validation block checking that all three required media files exist in state before firing the backend fetch request: 'front_image', 'back_image', and 'selfie_image'. If ANY of these three files are missing, block submission and throw an alert layout text block.
2. STATE RETENTION UPON SUCCESSFUL UPLOAD: In the successful upload response handler block, save the 'pending' status flag straight into the browser's persistent memory: localStorage.setItem('verificationStatus', 'pending').
3. HOME SCREEN PERSISTENCE LAYER: Update the initialization line for the 'verificationStatus' state hook so it actively checks browser memory on mount instead of defaulting to an unverified text string.
```

#### 3. Real-Time Dynamic Status Tracking & Asynchronous Background Polling
```text
Let's completely upgrade the home screen card banner logic and connect it to a real-time backend checker so the UI responds immediately to our OCR engine's results. 
Please modify your primary home screen file (e.g., 'HomeScreen.jsx' or 'HomeFeedScreen.jsx') and 'backend/api/index.py' to implement this end-to-end flow:
1. READ STATE STRINGS: Ensure the frontend 'verificationStatus' state hook pulls four explicit string flags: "unverified", "pending", "verified", or "failed".
2. REWRITE CONDITIONAL BANNER RENDERING (4 Dynamic Scenarios): Map out visual updates for Unverified, Pending, Verified (hides card completely), and Failed (displays a red warning triangle card wrapper with retry options).
3. LIVE RE-CHECK SYSTEM (React useEffect Polling): If state is "pending", initialize a standard setInterval background hook that fires an absolute status check call to our backend every 3 seconds: fetch(`http://localhost:8000/auth/status/${userId}`).
4. BACKEND POLL STATUS ENDPOINT: Implement a clean, dedicated GET route at '/auth/status/{user_id}' that queries our Supabase table.
```

#### 4. Existing User Login State Validation (Cross-Referencing Session States)
```text
Fix the state loop on account login. When an existing user logs in, the app defaults to showing the 'Verify your identity' banner because the login system does not populate localStorage with their current database verification status.
Please modify 'backend/api/index.py' and your frontend Login screen component:
1. BACKEND LOGIN PAYLOAD EXPANSION: Immediately after validating user credentials successfully, write an active query to look up this user's record inside our Supabase 'documents' table matching their user_id. Append this string value into the final successful login JSON payload as "verification_status".
2. FRONTEND STORAGE ALLOCATION: Capture the new variable from the server payload response and write it straight to browser memory right before routing to home.
```

### Architectural Summary
The platform stands as a secure, reactive, and resilient MVP architecture. It ensures input filtering at the entry line, handles session retention flawlessly across multiple modules using local memory configurations, matches active user IDs against cloud database lookups on handshake, and leverages an external asynchronous cloud computing framework to parse real-world assets into structured digital parameters.

# Project Presentation Prompts - Phase 5 Onwards

This file contains the complete, production-grade prompts used to finalize the social media interaction mechanics, backend route sanitation, storage policy overrides, and visual layout optimizations.

---

## 🛠️ Phase 5: Backend Endpoint Sanitation & Storage Crash Prevention

### Prompt: Robust Request Parsing & UUID Safety Guardrails
```text
Please open 'backend/api/index.py' and completely overwrite the 'POST /posts/create' endpoint with this highly resilient, generic request parser configuration. It extracts the raw form fields manually so that missing parameters, empty fields, or strict type mismatches can never cause a 500 or 422 server crash.

Execute these rules exactly:
1. Dynamically read the incoming multipart form payload using 'await request.form()'.
2. Safely extract user_id, username, caption, and the file payload using flexible fallbacks.
3. If user_id contains string patterns like 'None', 'undefined', or object dictionaries, use a regex matcher to extract ONLY the clean UUID token, falling back to '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8' if empty.
4. Remove any folder hierarchies ('posts/') from the storage path completely to prevent subfolder creation key mismatch errors. Drop the file directly into the bucket root using a flat string format:
   storage_path = f"{user_id}_{timestamp}_{uploaded_file.filename}"
5. Inject the 'upsert: True' boolean property flag into the Supabase upload call parameters to ignore duplicate locking rules entirely.
```

---

## 🔒 Phase 6: Supabase Security Override (Storage Bucket Access)

### Prompt: Complete Storage Bucket Permissions Unlocking
```text
Run this exact query inside the Supabase Project Dashboard SQL Editor to instantly overwrite Row Level Security (RLS) policies on the public 'post-images' storage bucket, allowing our publishable public keys to upload assets directly:

-- 1. Enable anyone to upload files to your 'post-images' bucket
CREATE POLICY "Public Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'post-images');

-- 2. Enable anyone to look at files in your 'post-images' bucket
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'post-images');
```

---

## 💻 Phase 7: Frontend Redirect & Mismatch Elimination

### Prompt: Overwriting the Profile Setup Button Loop
```text
The submit button inside 'CreateProfileScreen.jsx' is completely wrong. It is currently executing a registration signup logic network loop returning 'User already registered' instead of posting creation data.

Please go into 'src/screens/CreateProfileScreen.jsx' right now and completely replace the button's click handler function to act as our working post creator bridge to the local backend:

const handleSharePost = async () => {
  const imageFile = typeof selectedFile !== 'undefined' ? selectedFile : (typeof selectedImage !== 'undefined' ? selectedImage : image);
  if (!imageFile) return alert("Please select an image file first!");

  const formData = new FormData();
  formData.append('user_id', user?.id || '1afa8840-e0e5-4f8f-bfb5-44b7b94714d8');
  formData.append('username', user?.username || 'anonymous');
  formData.append('caption', typeof caption !== 'undefined' ? caption : '');
  formData.append('file', imageFile);

  try {
    const response = await fetch('http://localhost:8000/posts/create', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200 || response.ok) {
      if (typeof setCaption === 'function') setCaption('');
      navigation.navigate('HomeFeed');
    } else {
      alert("Server rejected post creation");
    }
  } catch (error) {
    console.error("Network error connecting to server:", error);
  }
};
```

---

## 🎨 Phase 8: Home Timeline Polish & Empty Post Mitigation

### Prompt: Global Photo-Only Media Constraint Enforcement
```text
We need to make selecting an image completely mandatory across the post creation workflow to prevent blank status blocks from cluttering the presentation timeline. 

Apply these rules strictly on both sides:
1. FRONTEND: Inside 'CreatePostScreen.jsx', verify that if the image state variable evaluates to null or undefined, the handler flashes an alert message and explicitly calls a hard return before the fetch payload executes.
2. BACKEND: In 'backend/api/index.py', switch the 'file' attribute signature back to a required parameter field ('file: UploadFile = File(...)'). Reject empty requests with a clean 400 Bad Request status text error block.
3. HOMEPAGE FEED DATA MAPPING: Inside 'HomeScreen.jsx', insert an explicit array filter operation inside the data-fetching logic hook right before calling 'setPosts()' to completely hide any trailing legacy test rows lacking an image link:
   const validImagePosts = result.posts.filter(post => post.image_url && !post.image_url.includes('ui-avatars.com'));
   setPosts(validImagePosts);
```

### Prompt: Database Junk Data Cleansing
```text
Run this data purge utility command inside the Supabase SQL Editor script window to cleanly scrub out any broken test rows generated during intermediate compilation steps:

DELETE FROM public.posts 
WHERE image_url LIKE '%ui-avatars.com%' 
   OR image_url IS NULL 
   OR caption = username;
```

---

## 👤 Phase 9: Profile Avatar and Information Coupling

### Prompt: Dynamic Identity Mapping & Circular Picker Action
```text
Please expand the profile photo feature to ensure the avatar updates globally across the app, syncing with both the profile screen and the account creation screen.

Execute these updates:
1. GLOBAL STATE SYNC (ProfileScreen.jsx & CreateProfileScreen.jsx):
   - Wrap the grey circular profile box inside 'ProfileScreen.jsx' with a 'TouchableOpacity' connected to the camera roll device image picker.
   - When a photo is uploaded from either screen, immediately submit it to a new backend route ('/users/avatar') and map the returned URL string dynamically inside the circle avatar template:
     source={{ uri: user?.profile_image || 'https://ui-avatars.com' + user?.username }}
2. BACKEND PROFILE UPDATE (backend/api/index.py):
   - Create a POST route at '/users/avatar' that accepts 'user_id' via Form and 'file' via UploadFile.
   - Save the file to the root of our existing storage bucket and run an update query against our profile database row parameters to save the persistence layer:
     supabase.table("profiles").update({"profile_image": public_url}).eq("user_id", user_id).execute()
```

---

## 🔍 Phase 10: Live Communities Search Integration

### Prompt: Transforming the Explore Screen Placeholder into Active Grid
```text
Please open the Explore Communities screen component ('ExploreScreen.jsx' or 'ExploreCommunitiesScreen.jsx') right now. We need to completely wipe out the static layout placeholder and replace it with a production-ready, high-performance creator query engine.

Requirements to implement:
1. On component mount (useEffect), run an async fetch call to our global feed endpoint ('http://localhost:8000/posts/feed').
2. Use a standard JavaScript Set wrapper loop to parse the returned posts array and filter down to unique creator username objects containing their calculated public avatar urls.
3. Store this filtered collection in local state arrays ('creators' and 'filteredCreators').
4. Link the header search text input bar directly to an execution filter block mapping 'text.toLowerCase()' matches against the array in real-time.
5. Format the rows using standard FlatList items containing the circular avatar image, user handle text fields, and a stylized black 'Join' button.
```
