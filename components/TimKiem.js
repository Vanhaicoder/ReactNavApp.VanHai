import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
const TimKiem = ({icon, placeholder}) => {
  return (
    <View style={{
        backgroundColor:"#ffff",
        flexDirection:"row",
        paddingVertical:16,
        borderRadius:8,
        paddingHorizontal:16,
        marginVertical:16,

        shadowColor:"#000",
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.1,
        shadowRadius:7,
      }}>
        <FontAwesome name={icon} size={20} color={"#f96163"}/>
      <TextInput style={{paddingLeft:8,fontSize:16,color:"#808080"}}placeholder={placeholder}></TextInput>
    </View>
  )
}

export default TimKiem

const styles = StyleSheet.create({})