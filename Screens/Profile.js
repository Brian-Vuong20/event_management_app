import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
const Tab = createBottomTabNavigator();
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
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={styles.logoutButton}
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
  logoutButton: {
    backgroundColor: "#58D68D",
    marginBottom: 20,
    alignItems: "center",
    width: "60%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
  },
});
