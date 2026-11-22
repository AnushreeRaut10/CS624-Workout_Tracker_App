
export const exercises = [
  { id: '1', name: 'Push-ups', category: 'Strength' },
  { id: '2', name: 'Squats', category: 'Strength' },
  { id: '3', name: 'Lunges', category: 'Strength' },
  { id: '4', name: 'Pull-ups', category: 'Strength' },
  { id: '5', name: 'Deadlifts', category: 'Strength' },
  { id: '6', name: 'Plank', category: 'Core' },
  { id: '7', name: 'Sit-ups', category: 'Core' },
  { id: '8', name: 'Crunches', category: 'Core' },
  { id: '9', name: 'Running', category: 'Cardio' },
  { id: '10', name: 'Walking', category: 'Cardio' },
  { id: '11', name: 'Cycling', category: 'Cardio' },
  { id: '12', name: 'Jumping Jacks', category: 'Cardio' },
  { id: '13', name: 'Burpees', category: 'Full Body' },
  { id: '14', name: 'Mountain Climbers', category: 'Full Body' },
  { id: '15', name: 'Jump Rope', category: 'Cardio' },
];

export function searchExercises(query) {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return exercises;
  }

  return exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(keyword) ||
    exercise.category.toLowerCase().includes(keyword)
  );
}
