import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
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
import {
  doc,
  getFirestore,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import "../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EventContext from "../EventContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function EventDetailScreen({ navigation, route }) {
  const db = getFirestore();
  const [list, setList] = useState("");

  useEffect(() => {
    //get all events data
    onSnapshot(collection(db, "events"), (onSnapshot) => {
      let arr = [];
      onSnapshot.forEach((data) => {
        arr.push({
          id: data.id,
          name: data.data().eventName,
          time: data.data().eventTime,
          date: data.data().eventDate,
          location: data.data().location,
        });
      });
      setList(arr);
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
  const goToDetail = (item) => {
    //navigate to event datail screen with all info
    const { id, name, time, date, location } = item;
    navigation.navigate("EventDetail", {
      id: id,
      eventName: name,
      time: time,
      date: date,
      location: location,
    });
  };
  const deleteEvent = async (item) => {
    //delete event where event id = 1
    await deleteDoc(doc(db, "events", item.id));
  };
  return (
    <View style={styles.container}>
      <Toast />
      <Text>List of events</Text>
      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToDetail(item)}>
              <View style={styles.listItem}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  {item.name}
                </Text>
                <View style={styles.management}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() =>
                      navigation.navigate("UpdateEventScreen", { items: item })
                    }
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Poppins_500Medium",
                      }}
                    >
                      Update
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteEvent(item)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "Poppins_500Medium",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
  management: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "50%",
  },
  updateButton: {
    backgroundColor: "#58D68D",
    marginRight: 10,
    padding: 3,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#58D68D",
    borderRadius: 10,
    padding: 3,
    width: "40%",
    alignItems: "center",
  },
});
//#58D68D
