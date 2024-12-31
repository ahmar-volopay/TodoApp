import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import CompletedScreen from './screens/CompletedScreen';
import ToDoScreen from './screens/TodoScreen';
import WIPScreen from './screens/WIPScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [taskIdCounter, setTaskIdCounter] = useState(1);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedCounter = await AsyncStorage.getItem('taskIdCounter');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
        setTaskIdCounter(storedCounter ? parseInt(storedCounter, 10) : 1);
      } catch (error) {
        console.error(
          'Error loading tasks or counter from AsyncStorage',
          error,
        );
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to AsyncStorage', error);
      }
    };
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    const saveTaskIdCounter = async () => {
      try {
        await AsyncStorage.setItem('taskIdCounter', taskIdCounter.toString());
      } catch (error) {
        console.error('Error saving taskIdCounter to AsyncStorage', error);
      }
    };
    saveTaskIdCounter();
  }, [taskIdCounter]);

  const addTask = () => {
    if (text.trim()) {
      const newTask = {id: taskIdCounter, text, status: 'not-started'};
      setTasks(prevTasks => [...prevTasks, newTask]);
      setText('');
      setTaskIdCounter(prevCounter => prevCounter + 1);
    }
  };

  const toggleTaskCompletion = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, status: newStatus} : task,
    );
    setTasks(updatedTasks);
  };

  const deleteTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
      setTasks(updatedTasks);
      setDeleteModalVisibility(false);
    }
  };

  const editTask = taskId => {
    const editableTask = tasks.find(task => task.id === taskId);
    if (editableTask) {
      setText(editableTask.text);
      setTaskToDelete(editableTask.id);
      setEditModalVisibility(true);
    }
  };

  const saveEditedTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.map(task =>
        task.id === taskToDelete ? {...task, text} : task,
      );
      setTasks(updatedTasks);
      setText('');
      setTaskToDelete(null);
      setEditModalVisibility(false);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home">
          {props => (
            <HomeScreen
              {...props}
              tasks={tasks}
              setTasks={setTasks}
              text={text}
              setText={setText}
              addTask={addTask}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
              editModalVisibility={editModalVisibility}
              setEditModalVisibility={setEditModalVisibility}
              saveEditedTask={saveEditedTask}
              taskToDelete={taskToDelete}
              setTaskToDelete={setTaskToDelete}
              deleteModalVisibility={deleteModalVisibility}
              setDeleteModalVisibility={setDeleteModalVisibility}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {props => (
            <CompletedScreen
              {...props}
              tasks={tasks}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="To-Do">
          {props => (
            <ToDoScreen
              {...props}
              tasks={tasks}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="WIP">
          {props => (
            <WIPScreen
              {...props}
              tasks={tasks}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
