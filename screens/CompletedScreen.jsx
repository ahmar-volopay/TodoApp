import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function CompletedScreen({ tasks, toggleTaskCompletion }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks.filter(task => task.completed).map(task => (
          <View key={task.id} style={styles.taskItem}>
            <Checkbox
              status="checked"
              onPress={() => toggleTaskCompletion(task.id)}
            />
            <Text style={styles.completedTaskText}>{task.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 15 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  completedTaskText: { flex: 1, fontSize: 16, textDecorationLine: 'line-through', color: 'grey' },
});
