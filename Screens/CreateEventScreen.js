import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Button,
} from "react-native";

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
  collection,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
export default function CreateEventScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [myDate, setMyDate] = useState(
    new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear()
  );
  const [time, setTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const [mode, setMode] = useState("");
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState("");
  const [location, setLocation] = useState("");
  const [participant, setParticipant] = useState("");
  const [eventError, seteventError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    onSnapshot(collection(db, "participants"), (onSnapData) => {
      let arr = {};
      onSnapData.forEach((data) => {
        arr = {
          ...arr,
          [data.id]: {
            name: data.data().participantName,
            isAttend: false,
            isInvite: false,
          },
        };
      });

      setParticipant(arr);
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
  const onChange = (event, selectedDate) => {
    let date = new Date(selectedDate);
    if (event.type == "set") {
      let getDate =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      let getTime = date.getHours() + ":" + date.getMinutes();
      setMyDate(getDate);
      setTime(getTime);
      setShow(!show);
    }
  };
  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(!show);
  };

  const createEvent = async () => {
    if (event.length == 0) {
      seteventError(true);
      return;
    }
    if (location.length == 0) {
      setLocationError(true);
      return;
    }
    setLocationError(false);
    seteventError(false);
    Keyboard.dismiss();
    //add event to database using addDoc
    await addDoc(collection(db, "events"), {
      eventName: event,
      location: location,
      eventDate: myDate,
      eventTime: time,
      participants: {},
    })
      .then((doc) => {
        Toast.show({
          type: "success",
          text1: "Event is added",
        });
      })
      .catch((err) => console.log(err));
    setEvent("");
    setLocation("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Toast />

      <View style={styles.eventContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Enter event</Text>
        <TextInput
          style={styles.eventField}
          value={event}
          onChangeText={setEvent}
          placeholder="Enter event"
        />
        {eventError && (
          <Text style={{ color: "red" }}>Field can not be null</Text>
        )}
      </View>
      <View style={styles.locationContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Enter location</Text>
        <TextInput
          style={styles.locationField}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />
        {locationError && (
          <Text style={{ color: "red" }}>Field can not be null</Text>
        )}
      </View>
      <View style={styles.dateContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Date</Text>
        <View style={styles.dateContainer_1}>
          <TextInput
            style={styles.dateInput}
            value={myDate}
            onChangeText={setDate}
          />
          <View style={styles.dateButton}>
            <TouchableOpacity onPress={() => showMode("date")}>
              <MaterialIcons name="date-range" size={30} color="grey" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Time</Text>
        <View style={styles.timeContainer_1}>
          <TextInput
            style={styles.timeInput}
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity onPress={() => showMode("time")}>
            <MaterialCommunityIcons name="timetable" size={30} color="grey" />
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <RNDateTimePicker
          mode={mode}
          value={date}
          display="spinner"
          onChange={onChange}
          is24Hour={true}
        />
      )}

      <TouchableOpacity onPress={createEvent} style={styles.createEventButton}>
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
