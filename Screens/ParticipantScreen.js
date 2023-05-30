import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import "../firebase";

export default function ParticipantScreen({ navigation, route }) {
  const db = getFirestore();

  const [participant, setParticipant] = useState("");
  const [list, setList] = useState("");
  const [partList, setPartList] = useState("");
  const id = route.params.eventId;

  useEffect(() => {
    //get all participants in databse
    //kiran vingh JOIh, etc
    onSnapshot(collection(db, "participants"), (onSnapData) => {
      let arr = [];
      //select all participants and set it to isInvite is false by default
      onSnapData.forEach((doc) => {
        arr.push({
          id: doc.id,
          name: doc.data().participantName,
          isInvite: false,
        });
      });
      setList(arr);
    });
    //get eventname = Advanced show info of that event
    onSnapshot(doc(db, "events", id), (onSnapData) => {
      let part = onSnapData.data().participants;
      //{userid: 1, userId: 2} // map {userId: 1}
      //get all participants that participate in this events and compare two map if there is user in the
      //event then set it to invite = true in order to create invite toggle state
      setPartList(part);
      for (let i = 0; i < list.length; i++) {
        for (let key in part) {
          if (part[key].id == list[i].id) {
            list[i] = { id: list[i].id, name: list[i].name, isInvite: true };
            break;
          }
        }
      } // {userID: 1, isInvite: true, userId: 2, }
      setParticipant(list);
    });
  }, [list]);
  //font
  let [fontLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontLoaded) {
    return;
  }
  const inviteParticipant = async (item) => {
    //check if user isInvite or not
    if (!item.isInvite) {
      //in this case user is not invite then invite this user to participant
      await updateDoc(doc(db, "events", id), {
        //copy all participants to new map and change the invited user to invite = true
        participants: {
          ...partList,
          [item.id]: {
            id: item.id,
            name: item.name,
            isAttend: false,
            invite: true,
          },
        },
      });
    } else if (item.isInvite) {
      let arr = {};

      for (let key in partList) {
        //filter the user that is not equal the user you are going to uninvite with this id and copy to map
        if (key !== item.id) {
          arr = {
            ...arr,
            [key]: {
              id: key,
              name: partList[key].name,
              isInvite: true,
              isAttend: partList[key].isAttend,
            },
          };
        }
      }
      await updateDoc(doc(db, "events", id), {
        participants: arr,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Invite participant</Text>
      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={participant}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>{item.name}</Text>
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => inviteParticipant(item)}
              >
                <Text
                  style={{ color: "white", fontFamily: "Poppins_500Medium" }}
                >
                  {item.isInvite ? "Uninvite" : "Invite"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => navigation.navigate("EventScreen")}
      >
        <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ListContainer: {
    flex: 0.5,

    width: "90%",
  },
  listItem: {
    borderWidth: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    borderColor: "#58D68D",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inviteButton: {
    borderWidth: 1,
    width: "30%",
    borderRadius: 10,
    borderColor: "#58D68D",
    backgroundColor: "#58D68D",
    flexDirection: "row",
    justifyContent: "center",
  },
});
//#58D68D
