import React from 'react';
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const HelloWorldApp = () => {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState<string[]>([]);
  const [modalVisiblity, setModalVisibilty] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState<number | undefined>(
    undefined,
  );

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Enter Task:</Text>
        <TextInput
          onChangeText={setText}
          value={text}
          style={styles.input}
          placeholder="Enter task here"
        />
        <Button
          onPress={() => {
            if (text.trim()) {
              setTasks([...tasks, text]);
              setText('');
            }
          }}
          title="Add Task"
          color="#007BFF"
        />
      </View>

      <Modal visible={modalVisiblity} animationType="fade">
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Are you sure you want to delete this task?
          </Text>
          <View style={styles.options}>
            <Button
              onPress={() => setModalVisibilty(false)}
              title="Cancel"
              color="#d9534f"
            />
            <Button
              onPress={() => {
                if (deleteIndex !== undefined) {
                  setModalVisibilty(false);
                  deleteTask(deleteIndex);
                }
              }}
              title="Delete"
              color="#007BFF"
            />
          </View>
        </View>
      </Modal>

      <View style={styles.tasksContainer}>
        <ScrollView>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text style={styles.taskText}>{task}</Text>
              <Button
                onPress={() => {
                  setDeleteIndex(index);
                  setModalVisibilty(true);
                }}
                title="Delete"
                color="#d9534f"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
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
});

export default HelloWorldApp;
