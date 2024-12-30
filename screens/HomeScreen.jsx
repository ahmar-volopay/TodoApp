import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({
  tasks,
  text,
  setText,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTask,
  editModalVisibility,
  setEditModalVisibility,
  saveEditedTask,
  taskToEdit,
  setTaskToEdit,
  deleteModalVisibility,
  setDeleteModalVisibility,
  setTaskToDelete,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Manager</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tasksContainer}>
        <ScrollView>
          {tasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <Checkbox
                status={task.completed ? 'checked' : 'unchecked'}
                onPress={() => toggleTaskCompletion(task.id)}
              />
              <Text
                style={[
                  styles.taskText,
                  task.completed && styles.completedTaskText,
                ]}>
                {task.text}
              </Text>
              <TouchableOpacity
                onPress={() => editTask(task.id)}
                style={styles.iconButton}>
                <Icon name="edit" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDeleteModalVisibility(true);
                  setTaskToDelete(task.id);
                }}
                style={styles.iconButton}>
                <Icon name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Edit Task Modal */}
      <Modal
        transparent={true}
        visible={editModalVisibility}
        animationType="slide"
        onRequestClose={() => setEditModalVisibility(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
                Make your Changes
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Edit task"
              value={text}
              onChangeText={setText}
            />
            <View style={styles.options}>
              <TouchableOpacity
                onPress={saveEditedTask}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisibility(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Task Modal */}
      <Modal
        transparent={true}
        visible={deleteModalVisibility}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisibility(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this task?
            </Text>
            <View style={styles.options}>
              <TouchableOpacity
                onPress={() => setDeleteModalVisibility(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteTask}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 10,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 20,
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  iconButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
