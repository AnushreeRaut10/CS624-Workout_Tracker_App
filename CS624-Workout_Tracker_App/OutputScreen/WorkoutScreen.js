
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function WorkoutScreen({ workouts }) {
  const totalWorkouts = workouts.length;

  const completedWorkouts = workouts.filter(
    (workout) => workout.completed === true
  ).length;

  const incompleteWorkouts =
    totalWorkouts - completedWorkouts;

  const completionPercentage =
    totalWorkouts > 0
      ? (completedWorkouts / totalWorkouts) * 100
      : 0;

  const totalSets = workouts.reduce(
    (sum, workout) => sum + Number(workout.sets),
    0
  );

  const totalDuration = workouts.reduce(
    (sum, workout) => sum + Number(workout.duration),
    0
  );

  const totalRepetitions = workouts.reduce(
    (sum, workout) =>
      sum + Number(workout.sets) * Number(workout.reps),
    0
  );

  const averageDuration =
    totalWorkouts > 0
      ? totalDuration / totalWorkouts
      : 0;

  function ProgressCard({ title, value }) {
    return (
      <View style={styles.card}>
        <Text style={styles.value}>
          {value}
        </Text>

        <Text style={styles.cardTitle}>
          {title}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        My Progress
      </Text>

      <Text style={styles.subtitle}>
        Track your workout activity and achievements.
      </Text>

      <ProgressCard
        title="Total Workouts"
        value={totalWorkouts}
      />

      <ProgressCard
        title="Completed Workouts"
        value={completedWorkouts}
      />

      <ProgressCard
        title="Incomplete Workouts"
        value={incompleteWorkouts}
      />

      <ProgressCard
        title="Completion Percentage"
        value={`${completionPercentage.toFixed(1)}%`}
      />

      <ProgressCard
        title="Total Sets"
        value={totalSets}
      />

      <ProgressCard
        title="Total Repetitions"
        value={totalRepetitions}
      />

      <ProgressCard
        title="Total Workout Minutes"
        value={totalDuration}
      />

      <ProgressCard
        title="Average Workout Duration"
        value={`${averageDuration.toFixed(1)} min`}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your statistics are calculated from locally
          saved workout records.
        </Text>
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    color: '#64748b',
    fontSize: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 22,
    marginBottom: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  cardTitle: {
    fontSize: 16,
    color: '#475569',
    marginTop: 6,
  },
  footer: {
    marginBottom: 35,
    marginTop: 8,
  },
  footerText: {
    textAlign: 'center',
    color: '#64748b',
  },
});
