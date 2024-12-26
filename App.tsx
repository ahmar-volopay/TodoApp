import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const HelloWorldApp = () => {
  const [text, setText] = React.useState('');
  const [tasks, setTasks] = React.useState<string[]>([]);

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
      <View style={styles.tasksContainer}>
        <ScrollView>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskItem}>
              <Text>{task}</Text>
              <Button
                onPress={() => deleteTask(index)}
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
