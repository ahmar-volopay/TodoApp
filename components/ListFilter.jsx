import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

export default function ListFilter({
  tasks,
  toggleTaskCompletion,
  FilterStatus,
}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {tasks
          .filter(task => task.status === FilterStatus)
          .map(task => (
            <View key={task.id} style={styles.taskItem}>
              <Picker
                selectedValue={task.status}
                style={styles.picker}
                onValueChange={itemValue =>
                  toggleTaskCompletion(task.id, itemValue)
                }>
                <Picker.Item label="Not Started" value="not-started" />
                <Picker.Item label="In Progress" value="in-progress" />
                <Picker.Item label="Completed" value="completed" />
              </Picker>
              <Text style={styles.taskText}>{task.text}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
