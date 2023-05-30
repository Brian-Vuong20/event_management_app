import { useState, useEffect, useContext } from "react";
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
import { onSnapshot, collection, getFirestore } from "firebase/firestore";
import "../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EventContext from "../EventContext";
export default function EventScreen({ navigation, route }) {
  const db = getFirestore();

  const [events, setEvents] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "events"), (myParticipant) => {
      let arr = [];

      myParticipant.forEach((doc) => {
        arr.push({
          id: doc.id,
          eventName: doc.data().eventName,
          location: doc.data().location,
          time: doc.data().eventTime,
          date: doc.data().eventDate,
          participants: doc.data()?.participants,
        });
      });
      setEvents(arr);
    });
  }, []);
  let [fontLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontLoaded) {
    return;
  }
  const inviteParticipant = (id) => {
    //return all the event that is not equal to id
    let eventId = events.filter((event) => event.id == id);
    navigation.navigate("ParticipantScreen", {
      participantList: eventId[0].participants,
      eventId: eventId[0].id,
    });
  };
  return (
    <View style={styles.container}>
      <Toast />
      <Text>List of events</Text>
      <Text>{events.id}</Text>
      <SafeAreaView style={styles.ListContainer}>
        {events.length !== 0 ? (
          <FlatList
            data={events}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={{ fontFamily: "Poppins_500Medium" }}>
                  {item.eventName}
                </Text>
                <TouchableOpacity onPress={() => inviteParticipant(item.id)}>
                  <Text style={{ fontFamily: "Poppins_500Medium" }}>
                    Invite
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.messageContainer}>
            <Text>There are no events</Text>
          </View>
        )}
      </SafeAreaView>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => navigation.navigate("Admin")}
      >
        <Text>Go back</Text>
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
    alignItems: "center",
  },
  inviteButton: {
    backgroundColor: "#58D68D",
    borderWidth: 1,
    borderColor: "#58D68D",
    width: "30%",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  messageContainer: {
    alignItems: "center",
  },
});
//#58D68D
