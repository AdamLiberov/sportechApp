import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../firebase/config";

export class Timer extends React.Component {
  constructor({ id, history }) {
    super();
    this.state = {
      minutes: 0,
      seconds: 5,
      id: id,
      history: history,
    };
    this.endGame = async () => {
      console.log("game ended");
      console.log("4");
      this.state.history.push(`/winScreen/${this.state.id}`);
    };

    this.secondsReducer = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({ seconds: this.state.seconds - 1 });
      } else {
        //seconds = 60;
        //minutes--;
        this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
      }
      if (this.state.minutes === 0 && this.state.seconds === 0) {
        clearInterval(this.secondsReducer);
        this.endGame();
      }
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.seconds}:</Text>
        <Text style={styles.text}>{this.state.minutes}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});
