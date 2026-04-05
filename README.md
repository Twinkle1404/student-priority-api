#  Indian Student Priority Engine

A Full-Stack application designed to help Indian students balance **University Academics** with **High-Stakes Competitive Exams** (UPSC, GATE, NIMCET, SSC).

##  The Problem
Standard "To-Do" apps only sort by due dates. For an Indian student, a college assignment due tomorrow is often less critical than a UPSC revision session for an exam in two months. This app uses a "Smart Priority" backend to solve this struggle.

##  Tech Stack
* **Frontend:** HTML5 (located in `index.html`)
* **Backend:** Node.js & Express.js
* **Database:** SQLite3 (Persistent storage)
* **Logic:** Custom Priority Service

##  The "Smart" Logic
The core of this project is the **Weighted Priority Algorithm**. It calculates a score using the following formula:

$$Score = \frac{Weight \times Difficulty}{HoursLeft + 1} \times (Multiplier)$$

* **College Tasks:** Multiplier = 1.0
* **Competitive Exams:** Multiplier = **1.5x** (Ensures career goals stay at the top of the list!)

##  Project Structure
* `index.html` - The User Dashboard.
* `app.js` - The Express server and API routes.
* `database.js` - Database connection and SQLite schema.
* `priorityLogic.js` - The "Brain" of the app (Algorithm).
* `seed.js` - Script to populate the database with sample student data.

##  How to Setup & Run
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Seed the Database:**
    ```bash
    node seed.js
    ```
3.  **Start the Server:**
    ```bash
    node app.js
    ```
4.  **Open in Browser:**
    Go to `http://localhost:3000` to see the dashboard.
