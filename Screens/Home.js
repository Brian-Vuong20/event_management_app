import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useContext, useEffect } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import EventContext from "../EventContext";
export default function Home({ navigation }) {
  const { value, setValue } = useContext(EventContext);
  useEffect(() => {
    const db = getFirestore();
    onSnapshot(collection(db, "events"), (onSnapData) => {
      let arr = [];
      onSnapData.forEach((doc) => {
        arr.push(doc.data());
      });
      setValue(arr);
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => navigation.navigate("Admin")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Admin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.participantButton}
          onPress={() => navigation.navigate("ParticipantLoginScreen")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Participant
          </Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    width: "60%",
    alignItems: "center",
  },
  adminButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "60%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
  participantButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "60%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
});
