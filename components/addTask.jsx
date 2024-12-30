import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
export default function addTask(c) {
  return (
    <View>
      <Text style={styles.heading}>Enter Task:</Text>
      <TextInput
        onChangeText={setText}
        value={text}
        style={styles.input}
        placeholder="Enter task here"
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
