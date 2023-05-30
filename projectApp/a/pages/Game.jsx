import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { db, functions } from "../firebase/config";
import Score from "../components/score.jsx";
import Navbar from "../components/Navbar.jsx";
import { Pedometer } from "expo-sensors";
import { Timer } from "../components/Timer.jsx";
import Loader from "../components/Loader.jsx";

let endInterval;
export class Game extends React.Component {
  constructor({ history, match }) {
    super();
    this.state = {
      match: match,
      history: history,
      user: "",
      enemy: "",
      isLoaded: false,
    };
    this.updateSteps = async () => {
      console.log("update steps");
      const newScope = this;
      db.collection("users")
        .doc(this.state.match.params.id)
        .onSnapshot(function (doc) {
          newScope.setState({ user: { id: doc.id, ...doc.data() } });
        });
      db.collection("users")
        .doc(this.state.enemy.id)
        .onSnapshot(function (doc) {
          newScope.setState({ enemy: { id: doc.id, ...doc.data() } });
        });
    };
    this.getSteps = async () => {
      console.log("get steps");
      Pedometer.watchStepCount((res) => {
        db.collection("users").doc(this.state.match.params.id).update({
          currentPoints: res.steps,
        });
        console.log("step added");
      });
    };
    this.findEnemyById = async () => {
      const doc = await db
        .collection("users")
        .doc(this.state.user.enemyId)
        .get();
      const enemy = { id: doc.id, ...doc.data() };
      await this.setState({ enemy: enemy });
    };
  }
  async componentDidMount() {
    const doc = await db
      .collection("users")
      .doc(this.state.match.params.id)
      .get();
    const user = doc.data();
    this.setState({ user: user });
    //check if loaded
    console.log("interval starts");
    endInterval = setInterval(async () => {
      const doc = await db
        .collection("users")
        .doc(this.state.match.params.id)
        .get();
      doc.data().enemyId
        ? await this.setState({
            isLoaded: true,
            user: { id: doc.id, ...doc.data() },
          })
        : console.log("");
    }, 100);
    this.getSteps();
    this.updateSteps();
  }

  componentDidUpdate() {
    if (this.state.isLoaded) {
      clearInterval(endInterval);
      this.findEnemyById();
    }
  }
  render() {
    //get my user steps in real time then save to database current steps
    const { isLoaded } = this.state;
    return (
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        {isLoaded ? (
          <View style={{ justifyContent: "space-between", flex: 0.6 }}>
            <View style={{ alignContent: "flex-end" }}>
              <Timer
                history={this.state.history}
                id={this.state.user.id}
              ></Timer>
              <Score
                points={this.state.user.currentPoints}
                name={this.state.user.name}
              ></Score>
              <Score
                points={this.state.enemy.currentPoints}
                name={this.state.enemy.name}
              ></Score>
            </View>
          </View>
        ) : (
          <View>
            <Loader isLoading={true}></Loader>
          </View>
        )}
      </View>
    );
  }
}
