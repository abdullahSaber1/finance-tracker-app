import {StyleSheet, View} from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import {COLORS, SCALE, SIZES} from "../../constants";

const {mvs} = SCALE;

type Props = {
  data: [string, string];
  handleOnSelect: (selected: string) => void;
  value: string;
};

const ToggleButtom = ({handleOnSelect, value}: Props) => {
  return (
    <View style={styles.container}>
      {["expense", "income"].map((item, index) => (
        <CustomButton
          key={index}
          label={item}
          style={[
            styles.btn,
            {
              backgroundColor:
                value === item ? COLORS.primary : COLORS.darkGrey,
            },
          ]}
          onPress={() => {
            handleOnSelect(item);
          }}
        />
      ))}
    </View>
  );
};

export default ToggleButtom;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: mvs(SIZES.margin),
  },
  btn: {
    width: "50%",
    borderRadius: 0,
  },
});
