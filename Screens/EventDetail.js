import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import "../firebase";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
export default function EventScreen({ navigation, route }) {
  const db = getFirestore();
  const [attend, setAttend] = useState("");
  const [location, setLocation] = useState(route.params?.location);
  const [time, setTime] = useState(route.params?.time);
  const [date, setDate] = useState(route.params?.date);
  const [eventName, setEventname] = useState(route.params?.eventName);
  const [list, setList] = useState("");

  useEffect(() => {
    //get event and participants for event 1
    onSnapshot(doc(db, "events", route.params.id), (data) => {
      let part = data.data()?.participants;
      let arr = [];
      for (let key in part) {
        arr.push(part[key]);
      }
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
  return (
    <View style={styles.container}>
      <View style={styles.informationContainer}>
        <View style={styles.nameLocationContainer}>
          <View style={styles.event}>
            <MaterialIcons name="event" size={24} color="black" />
            <Text
              style={{
                color: "white",
                marginLeft: 10,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {eventName}
            </Text>
          </View>
          <View style={styles.location}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
              {location}
            </Text>
          </View>
        </View>
        <View style={styles.timeDateContainer}>
          <View style={styles.time}>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
              {time}
            </Text>
          </View>
          <View style={styles.date}>
            <MaterialIcons name="date-range" size={24} color="black" />
            <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
              {date}
            </Text>
          </View>
        </View>
      </View>

      {list.length != 0 ? (
        <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
          Participants invited for this event
        </Text>
      ) : (
        <Text></Text>
      )}
      <SafeAreaView style={styles.listContainer}>
        {list.length !== 0 ? (
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text
                  style={{ color: "white", fontFamily: "Poppins_500Medium" }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ color: "white", fontFamily: "Poppins_500Medium" }}
                >
                  {item.isAttend ? "Attended" : "Not attend"}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={{ marginLeft: 60 }}>
            There are no participants in this event
          </Text>
        )}
      </SafeAreaView>

      <TouchableOpacity
        style={styles.gobackButton}
        onPress={() => navigation.navigate("EventDetailScreen")}
      >
        <Text style={{ alignItems: "center" }}>Go back</Text>
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
  listContainer: {
    flex: 0.5,

    borderRadius: 10,
    borderColor: "#58D68D",
    width: "90%",
    marginTop: 10,
  },
  listItem: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderColor: "#58D68D",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#58D68D",
  },
  informationContainer: {
    flex: 0.2,
    width: "90%",

    marginLeft: 20,
  },

  event: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#58D68D",
    width: "95%",
    padding: 5,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#58D68D",
  },
  location: {
    flexDirection: "row",
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#58D68D",
    width: "95%",
    padding: 5,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#58D68D",
  },
  timeDateContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  time: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58D68D",
    width: "40%",
    borderRadius: 10,
    backgroundColor: "#58D68D",
  },
  date: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58D68D",
    width: "50%",
    borderRadius: 10,
    backgroundColor: "#58D68D",
  },
  gobackButton: {
    backgroundColor: "#58D68D",
    padding: 5,
    width: "30%",

    alignItems: "center",
    borderRadius: 10,
  },
});
//#58D68D
