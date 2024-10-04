import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import MyTab from './Home/MyTab'
// import {MyTabs} from './Home/MyTab'
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <MyTab/>
     <Button
            onPress={() => navigation.replace('SignIn')}
            title="Go to SignIn"
            
          />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex :1,
        
    }
})