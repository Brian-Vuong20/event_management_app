import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Button,
} from "react-native";
import DatePicker from "react-native-date-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import "../firebase";
import {
  addDoc,
  doc,
  collection,
  getFirestore,
  onSnapshot,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import EventContext from "../EventContext";

export default function CreateParticipantScreen({ navigation }) {
  const [name, setName] = useState("");

  const [nameError, setnameError] = useState(false);
  const [list, setList] = useState("");
  const [partId, setPartId] = useState("");

  const db = getFirestore();
  useEffect(() => {
    onSnapshot(collection(db, "participants"), (onSnapData) => {
      let arr = [];
      onSnapData.forEach((data) => {
        arr.push(data.data());
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

  const createParticipant = () => {
    //add participant to database
    addDoc(collection(db, "participants"), {
      participantName: name,
    })
      .then((myDoc) => {
        setPartId(myDoc.id);
      })
      .catch((err) => console.log(err));
    setName("");
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <Toast />

      <View style={styles.eventContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Enter name</Text>
        <TextInput
          style={styles.eventField}
          value={name}
          onChangeText={setName}
          placeholder="Enter participant name"
        />
        {nameError && (
          <Text style={{ color: "red" }}>Field can not be null</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={createParticipant}
        style={styles.createEventButton}
      >
        <Text style={{ fontFamily: "Poppins_500Medium", color: "white" }}>
          Create
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontFamily: "Poppins_500Medium", color: "white" }}>
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

  eventContainer: {
    flexDirection: "column",
    width: "60%",
    marginBottom: 10,
  },
  eventField: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#58D68D",
    padding: 5,
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: "column",
    width: "60%",
    marginBottom: 10,
  },
  locationField: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#58D68D",
    padding: 5,
    borderRadius: 10,
  },
  dateContainer: {
    flexDirection: "column",
    width: "60%",
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    marginTop: 5,
    width: "100%",
    borderColor: "#58D68D",
    padding: 5,
    borderRadius: 10,
  },
  timeContainer: {
    flexDirection: "column",
    width: "60%",
    marginBottom: 10,
  },
  timeInput: {
    borderWidth: 1,
    marginTop: 5,
    borderColor: "#58D68D",
    padding: 5,
    width: "100%",
    borderRadius: 10,
  },
  dateContainer_1: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  timeContainer_1: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  createEventButton: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#58D68D",
    backgroundColor: "#58D68D",
    borderRadius: 10,
    width: "30%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});
//#58D68D
