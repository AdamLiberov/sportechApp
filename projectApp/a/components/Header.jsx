import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TopHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Login Via Email</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    fontSize: 40,
    textAlign: "center",
    padding:0,

  },
  container: {
    flexDirection: 'column',
    justifyContent: "flex-start",
  }
});

export default TopHeader;
