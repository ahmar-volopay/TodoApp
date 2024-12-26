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
  const [deleteIndex, setDeleteIndex] = React.useState(0);
  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Enter Task:</Text>
        <TextInput onChangeText={setText} value={text} style={styles.input} />
        <Button
          onPress={() => {
            if (text.trim()) {
              setTasks([...tasks, text]);
              setText('');
            }
          }}
          title="Add Task"
        />
      </View>
      <Modal visible={modalVisiblity}>
        <View>
          <Text>Are you sure to delete this Task??</Text>
          <Button
            onPress={() => {
              setModalVisibilty(false);
            }}
            title="Cancel"
          />
          <Button
            onPress={() => {
              setModalVisibilty(false);
              deleteTask(deleteIndex);
            }}
            title="Delete"
          />
        </View>
      </Modal>
      <View style={styles.tasksContainer}>
        <ScrollView>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text>{task}</Text>
              <Button
                onPress={() => {
                  setModalVisibilty(true);
                  setDeleteIndex(index);
                }}
                title="Delete"
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
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
    width: 200,
  },
  tasksContainer: {
    marginTop: 16,
    width: '100%',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default HelloWorldApp;
