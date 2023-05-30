import { Card, Text } from "react-native-elements";
import React from "react";
import { View, StyleSheet } from "react-native";

const WinDashboard = ({ winner, loser }) => (
    <Card style={{width: 500, height:100}}>
      <View style={styles.inner}>
        <Text h1>{winner}</Text>
        <Text>Loser: {loser}</Text>
      </View>
    </Card>
);
const styles = StyleSheet.create({
  inner: {
    width: 300, 
    height: 125,
    padding: 15,
   justifyContent: 'center',
   alignItems: 'center',
  },
});

export default WinDashboard;
