import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Home from "./Screens/Home";
import AdminTab from "./components/AdminTab";
import CreateEventScreen from "./Screens/CreateEventScreen";
import ParticipantScreen from "./Screens/ParticipantScreen";
import ParticipantLoginScreen from "./Screens/ParticipantLoginScreen";
import EventScreen from "./Screens/EventScreen";
import AttendanceScreen from "./Screens/AttendanceScreen";
import EventDetail from "./Screens/EventDetail";
import CreateParticipantScreen from "./Screens/CreateParticipantScreen";
import EventDetailScreen from "./Screens/EventDetailScreen";
import { EventProvider } from "./EventContext";
import UpdateEventScreen from "./Screens/UpdateEventScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState("Brian");
  return (
    <EventProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Admin"
            component={AdminTab}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CreateEventScreen"
            component={CreateEventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ParticipantScreen"
            component={ParticipantScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ParticipantLoginScreen"
            component={ParticipantLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventScreen"
            component={EventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateParticipantScreen"
            component={CreateParticipantScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetailScreen"
            component={EventDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateEventScreen"
            component={UpdateEventScreen}
            options={{ headerShown: false }}
          />
          {user ? (
            <Stack.Screen
              name="AttendanceScreen"
              component={AttendanceScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="ParticipantLoginScreen"
              component={ParticipantLoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </EventProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
