import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import CompletedScreen from './screens/CompletedScreen';
import ToDoScreen from './screens/TodoScreen';  // Make sure the path is correct

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [taskIdCounter, setTaskIdCounter] = useState(1);
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Load tasks and task counter from AsyncStorage on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const storedCounter = await AsyncStorage.getItem('taskIdCounter');
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const sortedTasks = [
            ...parsedTasks.filter(task => !task.completed),
            ...parsedTasks.filter(task => task.completed),
          ];
          setTasks(sortedTasks);
        }
        setTaskIdCounter(storedCounter ? parseInt(storedCounter, 10) : 1);
      } catch (error) {
        console.error('Error loading tasks or counter from AsyncStorage', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage when tasks state changes
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

  // Save taskIdCounter to AsyncStorage when it changes
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

  // Add a new task
  const addTask = () => {
    if (text.trim()) {
      const newTask = {id: taskIdCounter, text, completed: false};
      setTasks(prevTasks => [
        ...prevTasks,
        newTask,
      ]);
      setText('');
      setTaskIdCounter(prevCounter => prevCounter + 1);
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    const sortedTasks = [
      ...updatedTasks.filter(task => !task.completed),
      ...updatedTasks.filter(task => task.completed),
    ];
    setTasks(sortedTasks);
  };

  // Delete a task
  const deleteTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
      setTasks(updatedTasks);
      setDeleteModalVisibility(false);
    }
  };

  // Edit an existing task
  const editTask = taskId => {
    const editableTask = tasks.find(task => task.id === taskId);
    if (editableTask) {
      setText(editableTask.text);
      setTaskToDelete(editableTask.id); // or setTaskToEdit depending on logic
      setEditModalVisibility(true);
    }
  };

  // Save edited task
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
        <Tab.Screen name="CompletedScreen">
          {props => (
            <CompletedScreen
              {...props}
              tasks={tasks}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="ToDoScreen">
          {props => (
            <ToDoScreen
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
