const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

let user1;
let user2;
let isEnded = false;

const pairing = async () => {
  await db.collection("users").doc(user1.id).update({
    enemyId: user2.id,
    isPlaying: false,
  });
  await db.collection("users").doc(user2.id).update({
    enemyId: user1.id,
    isPlaying: false,
  });
  console.log(user1);
  console.log(user2);
  user2 = null;
  user1 = null;
};

exports.checkIsPlayingStatusChange = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    //getting the users
    if (change.after.data().isPlaying === true) {
      console.log("started");
      if (!user1) {
        console.log(user1);
        const data = change.after.data();
        user1 = { id: change.after.id, ...data };
      }
      if (!user2 && user1.name !== change.after.data().name) {
        console.log(user2);
        const data = change.after.data();
        user2 = { id: change.after.id, ...data };
        await pairing();
      }
    }
  });
