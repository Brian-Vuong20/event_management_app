import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import "../firebase";
import {
  collection,
  getDoc,
  getFirestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import EventContext from "../EventContext";
export default function ParticipantLoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const { value, setValue } = useContext(EventContext);
  let [fontLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!fontLoaded) {
    return;
  }

  const logIn = async () => {
    const db = getFirestore();
    //search user with this username
    const q = query(
      collection(db, "participants"),
      where("participantName", "==", username)
    );
    await getDocs(q).then((onSnap) => {
      //if there is a user then navigate to attendance screen with id and username
      if (!onSnap.empty) {
        let myData = [];
        onSnap.forEach((data) =>
          myData.push({ id: data.id, username: data.data().participantName })
        );
        setValue(myData);

        navigation.navigate("AttendanceScreen", {
          user: myData,
        });
      } else {
        //otherwise output the no user with this username
        setText("There is no user with this username");
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 25, margin: 10, fontFamily: "Poppins_600SemiBold" }}
      >
        Participant
      </Text>
      <TextInput
        style={styles.participantInput}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your name"
      />
      <View style={styles.groupButton}>
        <TouchableOpacity style={styles.loginButton} onPress={logIn}>
          <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
            Log in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gobackButton}
          onPress={() => navigation.popToTop()}
        >
          <Text style={{ color: "white", fontFamily: "Poppins_500Medium" }}>
            Go back
          </Text>
        </TouchableOpacity>
        <Text>{text}</Text>
      </View>
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
  groupButton: {
    width: "60%",
    marginTop: 20,
    flex: 0.3,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#58D68D",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    height: 40,
  },
  gobackButton: {
    backgroundColor: "#58D68D",
    width: "60%",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  participantInput: {
    borderWidth: 1,
    padding: 5,
    width: "60%",
    borderRadius: 10,
    borderColor: "#58D68D",
  },
});
