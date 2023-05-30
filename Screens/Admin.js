import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
export default function Admin({ navigation }) {
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
          style={styles.createEventButton}
          onPress={() => navigation.navigate("CreateEventScreen")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Create event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eventButton}
          onPress={() => navigation.navigate("CreateParticipantScreen")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Create User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.participantButton}
          onPress={() => navigation.navigate("EventScreen")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Invite Participant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eventButton}
          onPress={() => navigation.navigate("EventDetailScreen")}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins_500Medium",
            }}
          >
            Event Management
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
    width: "70%",
    alignItems: "center",
  },
  createEventButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "70%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
  participantButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "70%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
  eventButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "70%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
});
