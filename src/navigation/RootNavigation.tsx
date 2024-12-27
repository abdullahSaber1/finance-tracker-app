import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import TabNavigator from "./BottonTab";
import {OnBoardingScreen} from "../screens";
import {useAppSelector} from "../store/configureStore";

export type RootStackParamList = {
  onBoarding: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  const {showOnBoarding} = useAppSelector(state => state.setting);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="onBoarding"
        screenOptions={{
          headerShown: false,
        }}>
        {!showOnBoarding && (
          <Stack.Screen name="onBoarding" component={OnBoardingScreen} />
        )}
        <Stack.Screen name="MainApp" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
