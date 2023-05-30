import React from "react";
import { View,Text, StyleSheet } from "react-native";

const Navbar = () => (
  <View style={styles.Header}>
  
    <Text style={styles.Title}>Sportech</Text>
  
  </View>
)

const styles = StyleSheet.create({
  Header:{
   justifyContent: 'flex-start',
   width: '100%',
   height:90,
   backgroundColor: '#3a81f2',
   paddingTop: 36,
   justifyContent: 'center',
   alignItems: 'center',
  },
  Title: {
    fontSize:18,
    color: 'white',
  }
})

export default Navbar;