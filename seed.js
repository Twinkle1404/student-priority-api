import db from './database.js';

db.serialize(() => {
  // Clear old entries once manually before adding new ones
  db.run("DELETE FROM assignments");

  const stmt = db.prepare("INSERT INTO assignments (title, track, exam_name, weight, difficulty, due_date, estimated_hours) VALUES (?, ?, ?, ?, ?, ?, ?)");
  
  // Competitive Exam 1.5x Multiplier targets
  stmt.run("UPSC History Revision", "COMPETITIVE", "UPSC", 90, 5, "2026-05-15", 4);
  stmt.run("GATE Engineering Math", "COMPETITIVE", "GATE", 85, 4, "2026-04-25", 5);
  stmt.run("NIMCET Quant Mock", "COMPETITIVE", "NIMCET", 80, 3, "2026-04-20", 3);
  
  // College tasks
  stmt.run("College Physics Lab", "COLLEGE", null, 25, 2, "2026-04-08", 2);

  stmt.finalize();
  console.log("✅ Database Seeded Successfully!");
});