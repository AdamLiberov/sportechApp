import react from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";

const GameDashboard = ({ player1, player2 }) => (
  <View style={styles.container}>
    <Card>{/*add score componnent */}</Card>
    <Card>{/*add score componnent */}</Card>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
});
