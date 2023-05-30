import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

const PointsDisplayer = ({ points }) => {
  return (
    <View style={styles.container}>
      <Text h2>points: {points}</Text>
    </View>
  );
};
const styles = {
  container: {
    justifyConyent: "center",
  },
};
export default PointsDisplayer;
