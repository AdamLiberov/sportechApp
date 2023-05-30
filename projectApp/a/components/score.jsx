import React from "react";
import { View, Text, StyleSheet } from "react-native";
const Score = ({ points, name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >{name}: {points}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'right',
  },
});
export default Score;
