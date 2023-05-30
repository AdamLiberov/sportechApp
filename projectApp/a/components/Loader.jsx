import React, { Component } from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
const Loader = (props) => {
  return (
    <Modal visible={props.isLoading}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={150} color="#0000ff" />
      </View>
    </Modal>
  );
};
export default Loader;
