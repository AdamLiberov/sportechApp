import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Homepage from "./pages/HomePage.jsx";
import Gamepage from "./pages/GamePage.jsx";
import { Game } from "./pages/Game.jsx";
import { WinScreen } from "./pages/WinScreen.jsx";
import Navbar from "./components/Navbar.jsx";

import { decode, encode } from "base-64";
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import { db } from "./firebase/config";

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/gamepage/:id" component={Gamepage} />
            <Route exact path="/game/:id" component={Game} />
            <Route exact path="/winScreen/:id" component={WinScreen} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Navbar: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding:0,
    flex:1,
  },
});
