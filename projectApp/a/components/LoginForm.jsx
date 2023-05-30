import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { db } from "../firebase/config";

export default class Loginform extends Component {
  constructor({ history }) {
    super();
    this.state = {
      history: history,
      username: "",
      password: "",
    };
  }

  signIn = () => {
    console.log("heyy");
    let id;
    const { username, password } = this.state;
    db.collection("users")
      .where("password", "==", password)
      .get()
      .then((snapshot) => {
        console.log("1");
        snapshot.forEach((doc) => {
          id = doc.id;
        });
        this.state.history.push(`/gamepage/${id}`);
      });
  };
  signUp = async () => {
    const { username, password } = this.state;
    console.log("beach");
    const doc = await db.collection("users").add({
      username: username,
      password: password,
    });
    this.state.history.push(`/gamepage/${doc.id}`);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db",
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Username"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(username) => this.setState({ username })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db",
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.signIn()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.buttonContainer,
            styles.loginButton,
            { backgroundColor: "red" },
          ]}
          onPress={async () => await this.signUp()}
        >
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    right: 70,
    position: "absolute",
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: "white",
  },
  inner: {
    justifyContent: "flex-end",
  },
});
