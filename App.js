import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import HeatMap from './components/NewHeatmap';
import Task from './components/Task';
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import {React, useState, useEffect} from 'react';
import * as FileSystem from 'expo-file-system'; // Already imported

const fileUri = FileSystem.documentDirectory + 'tasks.json'; // Define the file path

const App = () => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  const [todo, settodo] = useState({
    work: null,
    isComplete: false
  });

  const [activity, setactivity] = useState([]);
  const [counter, setcounter] = useState({
    date: getCurrentDate(),
    count: +0
  });

  const [heatmaparray, setheatmaparray] = useState([]);

  // Function to save tasks locally
  const saveTasks = async (tasks) => {
    try {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(tasks));
      console.log('Tasks saved successfully');
    } catch (e) {
      console.error('Error saving tasks: ', e);
    }
  };

  // Function to load tasks from local file
  const loadTasks = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        const tasksData = await FileSystem.readAsStringAsync(fileUri);
        const savedTasks = JSON.parse(tasksData);
        setactivity(savedTasks);
        console.log('Tasks loaded successfully');
      } else {
        console.log('No file found, starting fresh');
      }
    } catch (e) {
      console.error('Error loading tasks: ', e);
    }
  };

  // Load tasks when the app starts
  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (todo.work != null) {
      const newTasks = [...activity, todo];
      setactivity(newTasks);
      settodo({ work: null, isComplete: false });
      saveTasks(newTasks);  // Save tasks after adding
    }
  };

  const handleTaskComplete = (index) => {
    let itemsCopy = [...activity];
    if (itemsCopy[index].isComplete == false) {
      itemsCopy[index].isComplete = true;

      const updateheatmap = {
        date: getCurrentDate(),
        count: counter.count + 1
      };
      setcounter(updateheatmap);
      setactivity(itemsCopy);
      setheatmaparray([...heatmaparray, counter]);
      saveTasks(itemsCopy);  // Save tasks after updating
    }
  };

  const handleDeleteTask = (index) => {
    let itemsCopy = [...activity];
    itemsCopy.splice(index, 1);
    setactivity(itemsCopy);
    saveTasks(itemsCopy);  // Save tasks after deleting
  };

  return (
    <View style={styles.containter}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.caledar}>
        <HeatMap values={heatmaparray} />
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.items}>
          {activity.map((items, index) => (
            <TouchableOpacity key={index} onPress={() => handleTaskComplete(index)} onLongPress={() => handleDeleteTask(index)}>
              <Task key={index} text={items.work} completed={items.isComplete}></Task>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writetaskWrappper}>
        <TextInput style={styles.input} placeholder={'Add New Task'} value={todo.work} onChangeText={text => settodo({ work: text, isComplete: false })}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  containter: { 
    flex: 1, 
    backgroundColor: '#FAF9F6' 
  },
  items: { 
    margin: 14,  
  },
  caledar: { 
    paddingTop: 50, 
    marginLeft: 30,
  },
  writetaskWrappper: { 
    position: 'absolute', 
    bottom: 20, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  input: { 
    paddingVertical: 15, 
    width: 250, 
    paddingHorizontal: 15, 
    backgroundColor: 'white', 
    borderRadius: 15, 
    borderColor: '#C0C0C0', 
    borderWidth: 1 
  },
  addWrapper: { 
    width: 60, 
    height: 60, 
    backgroundColor: 'white', 
    borderRadius: 60, 
    borderColor: '#C0C0C0', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  addText: {},
  scrollview: { 
    marginBottom: 60 
  }
});
