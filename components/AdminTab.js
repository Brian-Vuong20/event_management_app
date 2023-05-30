import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Admin from "../Screens/Admin";
import Profile from "../Screens/Profile";

import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
export default function AdminTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconname;
          if (route.name === "Home") {
            iconname = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconname = focused
              ? "information-circle"
              : "information-circle-outline";
          }
          return (
            <Ionicons name={iconname} size={size} color={color}></Ionicons>
          );
        },
        tabBarActiveTintColor: "tomamo",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="Home" component={Admin} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
