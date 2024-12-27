import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import {COLORS} from "../../constants";

type Props = TouchableOpacityProps & {
  icon: React.ReactNode;
};

const IconButton = ({icon, style, onPress}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
