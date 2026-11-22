
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

import { searchExercises } from '../Data/Exercise';

export default function AddOrEditWorkoutScreen({
  route,
  navigation,
  workouts,
  addWorkout,
  updateWorkout,
}) {
  const workoutId = route.params?.workoutId;

  const existingWorkout = workouts.find(
    (workout) => workout.id === workoutId
  );

  const [exerciseName, setExerciseName] = useState(
    existingWorkout?.name ?? ''
  );

  const [sets, setSets] = useState(
    existingWorkout
      ? String(existingWorkout.sets)
      : ''
  );

  const [reps, setReps] = useState(
    existingWorkout
      ? String(existingWorkout.reps)
      : ''
  );

  const [duration, setDuration] = useState(
    existingWorkout
      ? String(existingWorkout.duration)
      : ''
  );

  const [searchText, setSearchText] = useState('');
  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const results = searchExercises(searchText);

  function handleSave() {
    const numberOfSets = Number(sets);
    const numberOfReps = Number(reps);
    const durationMinutes = Number(duration);

    if (!exerciseName.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter an exercise name.'
      );
      return;
    }

    if (
      !sets.trim() ||
      !reps.trim() ||
      !duration.trim() ||
      !Number.isInteger(numberOfSets) ||
      numberOfSets <= 0 ||
      !Number.isInteger(numberOfReps) ||
      numberOfReps <= 0 ||
      !Number.isFinite(durationMinutes) ||
      durationMinutes <= 0
    ) {
      Alert.alert(
        'Validation Error',
        'Enter positive whole numbers for sets and repetitions, and a positive duration.'
      );
      return;
    }

    const workout = {
      id:
        existingWorkout?.id ??
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: exerciseName.trim(),
      sets: numberOfSets,
      reps: numberOfReps,
      duration: durationMinutes,
      date:
        existingWorkout?.date ??
        new Date().toLocaleDateString(),
      completed: existingWorkout?.completed ?? false,
    };

    if (existingWorkout) {
      updateWorkout(workout);
    } else {
      addWorkout(workout);
    }

    navigation.navigate('My Workouts');
  }

  function selectExercise(exercise) {
    setExerciseName(exercise.name);
    setSearchText('');
    setShowSearchResults(false);
  }

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>
        {existingWorkout
          ? 'Edit Workout'
          : 'Add New Workout'}
      </Text>

      <Text style={styles.label}>
        Search Exercise Library
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search exercises..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          setShowSearchResults(text.trim().length > 0);
        }}
      />

      {showSearchResults && (
        <View style={styles.searchResults}>
          {results.length === 0 ? (
            <Text style={styles.noResults}>
              No matching exercises.
            </Text>
          ) : (
            results.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.searchItem}
                onPress={() => selectExercise(exercise)}
              >
                <Text style={styles.exerciseTitle}>
                  {exercise.name}
                </Text>
                <Text style={styles.category}>
                  {exercise.category}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      <Text style={styles.label}>
        Exercise Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Push-ups"
        value={exerciseName}
        onChangeText={setExerciseName}
      />

      <Text style={styles.label}>
        Number of Sets
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: 3"
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />

      <Text style={styles.label}>
        Repetitions
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: 15"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />

      <Text style={styles.label}>
        Duration (Minutes)
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: 30"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {existingWorkout
            ? 'Update Workout'
            : 'Save Workout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f172a',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 7,
    color: '#334155',
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 17,
    fontSize: 16,
  },
  searchResults: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    color: '#64748b',
    marginTop: 3,
  },
  noResults: {
    color: '#64748b',
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 45,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
