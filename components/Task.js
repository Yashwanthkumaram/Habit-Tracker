import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import { TouchableOpacity } from 'react-native'

const Task = (props)=>{

    const handleTaskCompleted= ()=>{
        props.completed=true
       
      }
      

    return(
        
        <View style= { [styles.Task1 ,props.completed ? styles.Task2: null]}>
            <View style={styles.TaskLeft}>
                <TouchableOpacity style={styles.Square}></TouchableOpacity>
                <Text style={styles.Text}>{props.text}</Text>
            </View>
           
            <View style={styles.TaskRight}>

            </View>
        </View>
    )
}

const styles =StyleSheet.create({
    Task1:{
        backgroundColor:'#fff',
        padding:15,
        borderRadius: 10,
        marginBottom :10,
        flexDirection:'row',
        alignItems :'center',
        justifyContent:'space-between'


    },
    Task2:{
        
        backgroundColor:'#DAF7A6'

    },
    TaskLeft:{
        flexDirection: 'row',
        alignItems : 'center',
        flexWrap : 'wrap'

        

    },
    Square:{
        width:24,
        height:24,
        backgroundColor: '#55BCF6',
        opacity:0.4,
        borderRadius:5,
        marginRight:15,
    },
    Text:{
        maxWidth : '80%',
    
    
    },
    
    TaskRight:{
        width: 12,
        height: 12,
        bordercolor: '#55BCF6',
        borderWidth :2,
        borderRadius:5,
    }


})
export default Task;
