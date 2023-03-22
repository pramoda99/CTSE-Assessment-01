import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { firebase } from "./config";

import Login from "./screens/login";
import Register from "./screens/register";
import Header from "./components/header";
import Home from "./screens/home";

// match component..........................................
import AddMatch from "./screens/match/addMatch";
import DetailMatch from "./screens/match/detailMatch";
import MatchHome from "./screens/match/matchHome";

// players component.........................................
import AddPlayers from "./screens/players/addPlayers";
import DetailPlayers from "./screens/players/detailPlayers";
import PlayersHome from "./screens/players/playersHome";

// squad component...........................................
import AddSquad from "./screens/squad/addSquad";
import DetailSquad from "./screens/squad/detailSquad";
import SquadHome from "./screens/squad/squadHome";

// staff component...........................................
import AddStaff from "./screens/staff/addStaff";
import DetailStaff from "./screens/staff/detailStaff";
import StaffHome from "./screens/staff/staffHome";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Todo" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <Header name="Todo" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShow: false,
    // }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header name="Home" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      {/* Match component........................................ */}
      <Stack.Screen
        name="AddMatch"
        component={AddMatch}
        options={{
          headerTitle: () => <Header name="AddMatch" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailMatch"
        component={DetailMatch}
        options={{
          headerTitle: () => <Header name="DetailMatch" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="MatchHome"
        component={MatchHome}
        options={{
          headerTitle: () => <Header name="MatchHome" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      {/* Players component........................................ */}
      <Stack.Screen
        name="AddPlayers"
        component={AddPlayers}
        options={{
          headerTitle: () => <Header name="AddPlayers" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailPlayers"
        component={DetailPlayers}
        options={{
          headerTitle: () => <Header name="DetailPlayers" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="PlayersHome"
        component={PlayersHome}
        options={{
          headerTitle: () => <Header name="PlayersHome" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      {/* Squad component........................................ */}
      <Stack.Screen
        name="AddSquad"
        component={AddSquad}
        options={{
          headerTitle: () => <Header name="AddSquad" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailSquad"
        component={DetailSquad}
        options={{
          headerTitle: () => <Header name="DetailSquad" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="SquadHome"
        component={SquadHome}
        options={{
          headerTitle: () => <Header name="SquadHome" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      {/* Staff component........................................ */}
      <Stack.Screen
        name="AddStaff"
        component={AddStaff}
        options={{
          headerTitle: () => <Header name="AddStaff" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailStaff"
        component={DetailStaff}
        options={{
          headerTitle: () => <Header name="DetailStaff" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="StaffHome"
        component={StaffHome}
        options={{
          headerTitle: () => <Header name="StaffHome" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
