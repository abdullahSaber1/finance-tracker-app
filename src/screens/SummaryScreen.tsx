import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {PieChart} from "react-native-chart-kit";
import {COLORS, SCALE} from "../constants";
import {RootScreen} from "../components";
import {useAppSelector} from "../store/configureStore";

const {SC_Width, ms} = SCALE;

const SummaryScreen = () => {
  const {transactions, balance, income, expenses} = useAppSelector(
    state => state.transaction,
  );

  const data = [
    {
      name: "Income",
      population: income,
      color: COLORS.success,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Expenses",
      population: expenses,
      color: COLORS.danger,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };
  return (
    <RootScreen>
      <PieChart
        data={data}
        width={SC_Width}
        height={ms(300)}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        // center={[10, 50]}
        absolute
      />
    </RootScreen>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
