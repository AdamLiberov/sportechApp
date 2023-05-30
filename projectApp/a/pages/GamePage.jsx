import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { db } from "../firebase/config";
import Loader from "../components/Loader.jsx";
import PointsDisplayer from "../components/PointsDisplayer.jsx";
class Gamepage extends React.Component {
  constructor({ history, match }) {
    super();
    this.state = {
      match: match,
      history: history,
      user: "",
      isLoaded: false,
    };
    this.updateUsersPlayingStatus = (user) => {
      db.collection("users")
        .doc(this.state.match.params.id)
        .update({
          isPlaying: true,
          currentPoints: 0,
        })
        .then((doc) => {
          this.setState({ user: doc.data() });
          console.log(doc.data());
          console.log("playing status");
        });
    };
  }
  async componentDidMount() {
    const doc = await db
      .collection("users")
      .doc(this.state.match.params.id)
      .get();
    const user = doc.data();
    console.log(this.state.match.params.id);
    console.log(" game started");
    this.setState({ user: user, isLoaded: true });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {isLoaded ? (
          <View
            style={{
              flex: 0.9,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.myButton}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Button
                  onPress={async () => {
                    await this.updateUsersPlayingStatus(this.state.user);
                    this.state.history.push(
                      `/game/${this.state.match.params.id}`
                    );
                  }}
                  type="clear"
                  title="start game"
                  titleStyle={{ fontSize: 45, color: "black" }}
                ></Button>
              </View>
            </View>
            <View style={styles.pointsField}>
              <PointsDisplayer
                points={this.state.user.points}
              ></PointsDisplayer>
            </View>
          </View>
        ) : (
          <Loader isLoading={true} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myButton: {
    padding: 5,
    height: 340,
    width: 340, //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height
    backgroundColor: "red",
  },
  pointsField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
});
export default Gamepage;
