
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyWorkoutScreen from './OutputScreen/MyWorkoutScreen';

import AddOrEditWorkoutScreen from './OutputScreen/AddOrEditWorkoutScreen';

import WorkoutScreen from './OutputScreen/WorkoutScreen';

import {
  getStoredWorkouts,
  saveStoredWorkouts,
} from './Service/Storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const saved = await getStoredWorkouts();
        setWorkouts(saved);
      } catch (error) {
        Alert.alert(
          'Storage Error',
          'Unable to load saved workouts.'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    saveStoredWorkouts(workouts).catch(() => {
      Alert.alert(
        'Storage Error',
        'Unable to save workout changes.'
      );
    });
  }, [workouts, loading]);

  function addWorkout(workout) {
    setWorkouts((current) => [workout, ...current]);
  }

  function updateWorkout(updatedWorkout) {
    setWorkouts((current) =>
      current.map((workout) =>
        workout.id === updatedWorkout.id
          ? updatedWorkout
          : workout
      )
    );
  }

  function deleteWorkout(id) {
    setWorkouts((current) =>
      current.filter((workout) => workout.id !== id)
    );
  }

  function toggleWorkoutCompletion(id) {
    setWorkouts((current) =>
      current.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              completed: !workout.completed,
            }
          : workout
      )
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Loading Workout Tracker...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="My Workouts"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="My Workouts">
          {(props) => (
            <MyWorkoutScreen
              {...props}
              workouts={workouts}
              deleteWorkout={deleteWorkout}
              toggleWorkoutCompletion={toggleWorkoutCompletion}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Add/Edit Workout">
          {(props) => (
            <AddOrEditWorkoutScreen
              {...props}
              workouts={workouts}
              addWorkout={addWorkout}
              updateWorkout={updateWorkout}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="My Progress">
          {(props) => (
            <WorkoutScreen
              {...props}
              workouts={workouts}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    gap: 12,
  },
});
