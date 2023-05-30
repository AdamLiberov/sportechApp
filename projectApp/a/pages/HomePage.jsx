import React from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import Loginform from "../components/LoginForm.jsx";
import TopHeader from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";

const Homepage = ({ history }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Login}>
        <TopHeader></TopHeader>
        <Loginform history={history} style={{ flex: 1 }}></Loginform>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#DCDCDC",
  },
  Login: {
    marginTop: 50,
    justifyContent: "space-between",
    flex: 0.7,
  },
});
export default Homepage;
