import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {PICKERVAlUE} from '../constants/PickerValues';
import {PICKERLABELS} from '../constants/PickerLabels';
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
  taskToDelete,
  setTaskToDelete,
  deleteModalVisibility,
  setDeleteModalVisibility,
}) {
  const renderTask = ({item}) => (
    <View style={styles.taskContainer}>
      <Text
        style={[
          styles.taskText,
          item.status === 'completed' && styles.completedTask,
        ]}>
        {item.text}
      </Text>
      <Picker
        selectedValue={item.status}
        onValueChange={value => toggleTaskCompletion(item.id, value)}
        style={styles.picker}>
        <Picker.Item
          label={PICKERLABELS.NOT_STARTED}
          value={PICKERVAlUE.NOT_STARTED}
        />
        <Picker.Item
          label={PICKERLABELS.IN_PROGRESS}
          value={PICKERVAlUE.IN_PROGRESS}
        />
        <Picker.Item
          label={PICKERLABELS.COMPLETED}
          value={PICKERVAlUE.COMPLETED}
        />
      </Picker>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => editTask(item.id)}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setTaskToDelete(item.id);
          setDeleteModalVisibility(true);
        }}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTask}
        style={styles.taskList}
      />

      {/* Edit Task Modal */}
      <Modal visible={editModalVisibility} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          <TextInput
            style={styles.editInput}
            placeholder="Edit your task"
            value={text}
            onChangeText={setText}
          />
          <View style={styles.modalOptions}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveEditedTask}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisibility(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteModalVisibility} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Delete Task</Text>
          <Text>Are you sure you want to delete this task?</Text>
          <View style={styles.modalOptions}>
            <TouchableOpacity
              style={styles.confirmDeleteButton}
              onPress={deleteTask}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDeleteModalVisibility(false)}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskText: {
    fontSize: 16,
    flex: 2,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  picker: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalOptions: {
    flexDirection: 'row',
    gap: 6,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmDeleteButton: {
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

