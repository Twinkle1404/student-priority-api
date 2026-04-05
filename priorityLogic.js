export const calculatePriority = (task) => {
  const now = new Date();
  const dueDate = new Date(task.due_date);
  const hoursLeft = (dueDate - now) / (1000 * 60 * 60);

  if (hoursLeft <= 0) return 9999; 
  let score = (task.weight * task.difficulty) / (hoursLeft + 1);
  
  if (task.track === 'COMPETITIVE') {
    score *= 1.5;
  }
  return parseFloat(score.toFixed(2));
};