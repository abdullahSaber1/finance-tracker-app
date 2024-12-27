import React from "react";
import {COLORS, ICONS, SCALE} from "../../constants";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AddScreen, HomeScreen, SummaryScreen} from "../../screens";
import Typography from "../../components/ui/Typography";

export type TabParamList = {
  Add: undefined;
  Home: undefined;
  Summary: undefined;
};

const {HomeIcon, ChartIcon, PlusIcon} = ICONS;
const {s} = SCALE;

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={"Home"}>
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              fill={focused ? COLORS.primary : COLORS.darkGrey}
              width={s(22)}
              height={s(22)}
            />
          ),

          tabBarLabel: ({focused}) => (
            <Typography color={focused ? COLORS.primary : COLORS.darkGrey}>
              Home
            </Typography>
          ),
        }}
      />
      <Tab.Screen
        name={"Add"}
        component={AddScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused}) => (
            <PlusIcon
              fill={focused ? COLORS.primary : COLORS.darkGrey}
              width={s(22)}
              height={s(22)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Summary"}
        component={SummaryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <ChartIcon
              fill={focused ? COLORS.primary : COLORS.darkGrey}
              width={s(22)}
              height={s(22)}
            />
          ),

          tabBarLabel: ({focused}) => (
            <Typography color={focused ? COLORS.primary : COLORS.darkGrey}>
              Summary
            </Typography>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
