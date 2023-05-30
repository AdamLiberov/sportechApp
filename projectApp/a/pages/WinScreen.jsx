import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import WinDashboard from "../components/winDashboard.jsx";
import Loader from "../components/Loader";
import { Button } from "react-native-elements";

export class WinScreen extends React.Component {
  constructor({ match, history }) {
    super();
    this.state = {
      history: history,
      id: match.params.id,
      enemy: "",
      user: "",
      winner: "",
      loser: "",
      isLoaded: false,
    };
    this.getUser = async () => {
      const doc = await db.collection("users").doc(this.state.id).get();
      const user = doc.data();
      this.setState({
        user: {
          name: doc.data().name,
          currentPoints: doc.data().currentPoints,
          password: doc.data().password,
          points: doc.data().points,
          isPlaying: doc.data().isPlaying,
          enemyId: doc.data().enemyId,
          id: doc.id,
        },
      });
    };
    this.getEnemy = async () => {
      const doc = await db
        .collection("users")
        .doc(this.state.user.enemyId)
        .get();
      const enemy = doc.data();
      this.setState({
        enemy: {
          name: doc.data().name,
          currentPoints: doc.data().currentPoints,
          password: doc.data().password,
          points: doc.data().points,
          id: doc.id,
        },
      });
    };
    this.findWinner = () => {
      if (this.state.enemy.currentPoints > this.state.user.currentPoints) {
        //enemy won:
        this.setState({ winner: this.state.enemy });
        this.setState({ loser: this.state.user });
      } else {
        //user won
        this.setState({ winner: this.state.user });
        this.setState({ loser: this.state.enemy });
      }
    };
    this.updateStuff = async () => {
      await db
        .collection("users")
        .doc(this.state.winner.id)
        .update({
          points: this.state.winner.currentPoints + this.state.winner.points,
        });

      await db.collection("users").doc(this.state.user.id).update({
        enemyId: "",
        currentPoints: 0,
      });
    };
  }
  async componentDidMount() {
    console.log("wincreen");
    //get user by id;
    await this.getUser();
    //get enemy by id
    await this.getEnemy();
    this.findWinner();
    console.log("hey");
    await this.updateStuff();
    this.setState({ isLoaded: true });
  }
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {isLoaded ? (
          <View style={styles.container}>
            <WinDashboard style={{flex: 1}}
              winner={this.state.winner.name}
              loser={this.state.loser.name}
            ></WinDashboard>
            <Button
              title="Return To Gamepage"
              type="outline"
              onPress={() =>
                this.state.history.push(`/gamepage/${this.state.user.id}`)
              }
            />
          </View>
        ) : (
          <Loader isLoading={true} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "space-between",
  },
});
