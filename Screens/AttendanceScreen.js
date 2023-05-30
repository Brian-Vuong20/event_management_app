import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Switch,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  doc,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { firebase } from "@react-native-firebase/database";
import EventContext from "../EventContext";
export default function AttendanceScreen({ navigation, route }) {
  const { value, setValue } = useContext(EventContext);
  //{id: 1, name: Kiran}
  const myData = value;
  const user = route.params.user;
  const [username, setUsername] = useState(myData.username);
  const [userId, setUserId] = useState();
  const [list, setList] = useState("");
  const db = getFirestore();

  useEffect(() => {
    //query events that this user attend
    //{Ad database}
    const q = query(
      collection(db, "events"),
      where(`participants.${user[0].id}`, "!=", "undefined")
    );

    getDocs(q).then((data) => {
      //select all events that has this participant
      let arr = [];

      data.forEach((doc) => {
        arr.push({
          id: doc.id,
          name: doc.data().eventName,
          participants: doc.data().participants,
          //get attend state where user has this id create toggle state for this event
          isAttend: doc.data().participants[user[0].id].isAttend,
          //default false
        });
      });

      setList(arr);
    });
  }, [list]);
  let [fontLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontLoaded) {
    return;
  }
  const markAttendance = async (item) => {
    //get the user info from participant login screen
    //update doc basically means
    //[{id: 1, invite: true, isAttend: true}, {id: 2}]
    let data = item.participants;
    data[user[0].id] = {
      id: user[0].id,
      invite: true,
      isAttend: true,
      name: myData[0].username,
    };

    await updateDoc(doc(db, "events", item.id), {
      participants: data,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Poppins_500Medium" }}>Hi, {username}</Text>
      <Text style={{ fontFamily: "Poppins_500Medium" }}>
        You are invited to these events
      </Text>
      <SafeAreaView style={styles.ListContainer}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={{ fontFamily: "Poppins_500Medium" }}>
                {item.name}
              </Text>
              <TouchableOpacity onPress={() => markAttendance(item)}>
                <Text style={{ fontFamily: "Poppins_500Medium" }}>
                  {item.isAttend ? "Attended" : "Attend"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
          Log out
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
});
//#58D68D
