
import React from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function MyWorkoutScreen({
  navigation,
  workouts,
  deleteWorkout,
  toggleWorkoutCompletion,
}) {
  function confirmDelete(id) {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteWorkout(id),
        },
      ]
    );
  }

  function WorkoutButton({
    title,
    onPress,
    color = '#2563eb',
  }) {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        My Workouts
      </Text>

      <Text style={styles.subtitle}>
        Plan and track your daily exercises.
      </Text>

      <WorkoutButton
        title="+ Add New Workout"
        onPress={() =>
          navigation.navigate('Add/Edit Workout')
        }
      />

      <WorkoutButton
        title="View My Progress"
        color="#0f766e"
        onPress={() =>
          navigation.navigate('My Progress')
        }
      />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No workouts found. Add your first workout!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.exerciseName}>
              {item.name}
            </Text>

            <Text style={styles.detail}>
              Sets: {item.sets}
            </Text>

            <Text style={styles.detail}>
              Repetitions: {item.reps}
            </Text>

            <Text style={styles.detail}>
              Duration: {item.duration} minutes
            </Text>

            <Text style={styles.detail}>
              Date: {item.date}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color: item.completed
                    ? '#15803d'
                    : '#b45309',
                },
              ]}
            >
              {item.completed
                ? '✓ Completed'
                : 'Not Completed'}
            </Text>

            <WorkoutButton
              title={
                item.completed
                  ? 'Mark as Incomplete'
                  : 'Mark as Completed'
              }
              color="#0f766e"
              onPress={() =>
                toggleWorkoutCompletion(item.id)
              }
            />

            <WorkoutButton
              title="Edit Workout"
              onPress={() =>
                navigation.navigate('Add/Edit Workout', {
                  workoutId: item.id,
                })
              }
            />

            <WorkoutButton
              title="Delete Workout"
              color="#dc2626"
              onPress={() =>
                confirmDelete(item.id)
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#f8fafc',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 18,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    marginTop: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  detail: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 9,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748b',
    fontSize: 16,
  },
});
