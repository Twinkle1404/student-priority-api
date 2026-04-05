import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./student.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      track TEXT NOT NULL,
      exam_name TEXT,
      weight INTEGER NOT NULL,
      difficulty INTEGER NOT NULL,
      due_date TEXT NOT NULL,
      estimated_hours REAL
    )
  `);
});
export default db;