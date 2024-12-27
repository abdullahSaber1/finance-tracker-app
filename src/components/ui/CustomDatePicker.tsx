import {Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import DatePicker from "react-native-date-picker";
import {COLORS, ICONS, SCALE, SIZES, FONTS} from "../../constants";
import Typography from "./Typography";
import dayjs from "dayjs";

const {s, vs, ms, mvs} = SCALE;

const {CalendarIcon} = ICONS;

type Props = {
  handleOnChangeDate?: (date: Date) => void;
};

const CustomDatePicker = ({handleOnChangeDate}: Props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
      <Typography color={COLORS.darkGrey} style={styles.label}>
        {dayjs(date).format("ddd, DD MMM YYYY")}
      </Typography>

      <CalendarIcon fill={COLORS.primary} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          handleOnChangeDate?.(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: vs(50),
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    borderRadius: s(SIZES.radius),
    paddingHorizontal: ms(SIZES.padding),
    marginBottom: mvs(SIZES.margin),
  },
  label: {
    ...FONTS.h4,
  },
});
