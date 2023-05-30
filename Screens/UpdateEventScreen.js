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
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

export default function UpdateEventScreen({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const { id, eventName, location } = route.params.items;
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
  const [event, setEvent] = useState(eventName);
  const [locationUpdate, setLocationUpdate] = useState(location);

  const db = getFirestore();

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

  const updateEvent = async () => {
    await updateDoc(doc(db, "events", id), {
      eventName: event,
      location: locationUpdate,
      eventTime: time,
      eventDate: myDate,
    }).then(() => {
      Toast.show({
        type: "success",
        text1: "Event is updated",
      });
    });
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
          onChangeText={(text) => setEvent(text)}
          placeholder="Enter event"
        />
      </View>
      <View style={styles.locationContainer}>
        <Text style={{ fontFamily: "Poppins_500Medium" }}>Enter location</Text>
        <TextInput
          style={styles.locationField}
          value={locationUpdate}
          onChangeText={(text) => setLocationUpdate(text)}
          placeholder="Enter location"
        />
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

      <TouchableOpacity onPress={updateEvent} style={styles.createEventButton}>
        <Text style={{ fontFamily: "Poppins_500Medium", color: "white" }}>
          Update
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.navigate("EventDetailScreen")}
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
