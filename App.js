import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { firebase } from "./config";

import { View } from 'react-native';

import Login from "./screens/login";
import Register from "./screens/register";
import Header from "./components/header";
import Home from "./screens/home";
import Body from "./components/footer";

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

// training component...........................................
import AddTraining from "./screens/training/addTraining";
import DetailTraining from "./screens/training/detailTraining";
import TrainingHome from "./screens/training/trainingHome";

const Stack = createStackNavigator();




function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  
  // const App: () => Node = () => {
  //   return (
  //     <View>
  //       <BackgroundImg />
  //     </View>
  //   );
  // };
  

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
            headerTitle: () => <Header name="Football Manager - 23" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e47a",
              shadowColor: "#000",
              elevation: 25,
            },
            BodyStyle:{
              backgroundColor: "#00e47a"
            },
            Footer:{
              backgroundColor: "#00e47a"
            }
          }}
          
        />




        
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <Header name="" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#00e47a",
              shadowColor: "#000",
              elevation: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (

// backgroundColor:"blue";
    
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
            backgroundColor: "#00e47a",
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
          headerTitle: () => <Header name="Add New Fixture" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailMatch"
        component={DetailMatch}
        options={{
          headerTitle: () => <Header name="Update Match Result" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="MatchHome"
        component={MatchHome}
        options={{
          headerTitle: () => <Header name="All Fixtures" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
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
          headerTitle: () => <Header name="Add New Player" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailPlayers"
        component={DetailPlayers}
        options={{
          headerTitle: () => <Header name="Update Player" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
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
          headerTitle: () => <Header name="All Players" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
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
          headerTitle: () => <Header name="Create New Squad" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailSquad"
        component={DetailSquad}
        options={{
          headerTitle: () => <Header name="Update Squad" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="SquadHome"
        component={SquadHome}
        options={{
          headerTitle: () => <Header name="Squads" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      {/* Training component........................................ */}
      <Stack.Screen
        name="AddTraining"
        component={AddTraining}
        options={{
          headerTitle: () => <Header name="Add Training Session" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="DetailTraining"
        component={DetailTraining}
        options={{
          headerTitle: () => <Header name="Update Training Session" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
            shadowColor: "#000",
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="TrainingHome"
        component={TrainingHome}
        options={{
          headerTitle: () => <Header name="Trainings" />,
          headerStyle: {
            height: 150,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: "#00e47a",
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
