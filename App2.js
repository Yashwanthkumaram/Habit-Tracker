import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import HeatMap  from './components/NewHeatmap';
import Task from './components/Task';
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import {React,useState} from 'react';
import * as FileSystem from 'expo-file-system';




// export default function App() {
//   return (
//     <View style={styles.container}>
//       <HeatMap></HeatMap>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const App = () => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  

  const [todo, settodo]= useState({
    work :null,
    isComplete:false
  });

  const [activity, setactivity]= useState([]);

  const [counter , setcounter]= useState({
    date:getCurrentDate(),
    count:+0
  });

  const [heatmaparray,setheatmaparray] = useState([]);

  const handleAddTask = ()=>{
    Keyboard.dismiss();
    if (todo.work!=null){
    setactivity([...activity,todo])
    settodo({work:null, isComplete:false})
   }
  }


  const handleTaskComple= (index)=>{
    let itemsCopy = [...activity];
    if(itemsCopy[index].isComplete==false){
    itemsCopy[index].isComplete=true;

    const updateheatmap ={
      date:getCurrentDate(),
      count:counter.count+1
    }
    setcounter(updateheatmap);
    setactivity(itemsCopy);

    setheatmaparray( [...heatmaparray,counter]);
    }
  }
  
  const handleDeltelTask =(index)=>{
    let itemsCopy = [...activity];
    itemsCopy.splice(index,1)
    setactivity(itemsCopy);
    // if(heatmaparray[index].count>0){
    //   const temp = heatmaparray;  
    //   temp[index].count-1;
    //   setheatmaparray(temp);
    // }

  }

  return (
  
    
    <View style = {styles.containter}>
<StatusBar translucent backgroundColor="transparent" />


      {/* <View style = {styles.tasksWrapper}>
        <Text style={ styles.sectionTitle}> Habit Tracker</Text>
      </View>
       */}
      
      <View style={styles.caledar}>
      <HeatMap  
        
        values={heatmaparray}
      />
      </View>

      
      <ScrollView style={styles.scrollview}>
      <View style={ styles.items}>
      {activity.map( (items, index) => {
        return(
          <TouchableOpacity key={index} onPress={()=>handleTaskComple(index)} onLongPress ={()=>{handleDeltelTask(index)}}   > 
             <Task key={index} text={items.work} completed={items.isComplete} ></Task>
          </TouchableOpacity>
        );
        
      })}
      </View>


      </ScrollView>
      
        
      


    {/* tamma illi task add madthivi ✍️ */}
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.writetaskWrappper} >
    <TextInput style={styles.input} placeholder={'Add New Task'} value={todo.work} onChangeText ={text => settodo({work:text, isComplete:false})}></TextInput>
    <TouchableOpacity onPress ={()=>handleAddTask()}>
      <View style={styles.addWrapper}>
        <Text style={styles.addText} >+</Text>
      </View>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    
    
    </View>

    
  
  );
};

export default App;


const styles = StyleSheet.create({
  containter:{
    flex : 1,
    backgroundColor : '#C0C0C0',
    
  
  },
  tasksWrapper:{
    paddingTop : 10,
    paddingHorizontal :20,
    
  
  },
  sectionTitle:{
    fontSize : 24,
    fontWeight :'bold'
  
  },
  items:{
    margin:10,
  },
  caledar:{
    paddingTop:50,
    marginLeft:30,

  },
  writetaskWrappper:{
    position: 'absolute',
    bottom:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  input:{
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    backgroundColor: 'white',
    borderRadius:15,
    borderColor: '#C0C0C0',
    borderWidth:1,

  },
  addWrapper:{
    width :60, 
    height : 60,
    backgroundColor: 'white',
    borderRadius:60,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems:'center'
  },
  addText:{},
  scrollview:{
    marginBottom :60
  }
 
  
  })
