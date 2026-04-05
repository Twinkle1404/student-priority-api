import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import db from './database.js';
import { calculatePriority } from './priorityLogic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET — Fetch all assignments sorted by priority
app.get('/api/prioritize', (req, res) => {
  db.all("SELECT * FROM assignments", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const prioritized = rows.map(task => ({
      ...task,
      priority_score: calculatePriority(task)
    })).sort((a, b) => b.priority_score - a.priority_score);

    res.json({ status: "Success", count: prioritized.length, data: prioritized });
  });
});

// POST — Add a new assignment
app.post('/api/assignments', (req, res) => {
  const { title, track, exam_name, weight, difficulty, due_date, estimated_hours } = req.body;

  // Validation
  if (!title || !track || !weight || !difficulty || !due_date) {
    return res.status(400).json({ error: "Missing required fields: title, track, weight, difficulty, due_date" });
  }

  const sql = `INSERT INTO assignments (title, track, exam_name, weight, difficulty, due_date, estimated_hours) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [title, track, exam_name || null, weight, difficulty, due_date, estimated_hours || null];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ status: "Created", id: this.lastID });
  });
});

// DELETE — Remove an assignment
app.delete('/api/assignments/:id', (req, res) => {
  db.run("DELETE FROM assignments WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ status: "Deleted", id: req.params.id });
  });
});

app.listen(3000, () => console.log(`🚀 Server running at http://localhost:3000`));