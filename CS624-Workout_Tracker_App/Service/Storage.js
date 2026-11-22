
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@CS624_WorkoutTracker_Workouts';

export async function getStoredWorkouts() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data === null) {
      return [];
    }

    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error('Saved workout data is invalid');
    }

    return parsed;
  } catch (error) {
    console.error('Error loading workouts:', error);
    throw error;
  }
}

export async function saveStoredWorkouts(workouts) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(workouts)
    );
  } catch (error) {
    console.error('Error saving workouts:', error);
    throw error;
  }
}
