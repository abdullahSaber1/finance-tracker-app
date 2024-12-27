import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import {
  CustomButton,
  CustomDatePicker,
  RootScreen,
  TextField,
  ToggleButtom,
  Typography,
} from "../components";
import {SCALE, SIZES, FONTS} from "../constants";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Transaction} from "../types";
import {AddTransactions} from "../utils/validation";
import {useAppDispatch} from "../store/configureStore";
import {addTransactionAsync} from "../store/slices/transactionSlice";

const {ms, mvs} = SCALE;

const AddScreen = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      type: "expense",
      date: new Date(),
    },
    resolver: yupResolver(AddTransactions),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: Transaction) => {
    console.log("data", data);
    try {
      dispatch(addTransactionAsync(data));
      reset();
      Keyboard.dismiss();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <RootScreen style={styles.root}>
            <Typography style={styles.title}>Create transaction</Typography>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  label="amount"
                  keyboardType="numeric"
                  onChangeText={value => onChange(value)}
                  value={value ? value.toString() : ""}
                  errorText={errors.amount?.message}
                />
              )}
              name="amount"
              rules={{required: true}}
            />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <ToggleButtom
                  handleOnSelect={value => onChange(value)}
                  value={value}
                  data={["expense", "income"]}
                />
              )}
              name="type"
              rules={{required: true}}
            />

            {/* <Dropdown
              data={[
                {label: "ddd", value: "sadsad"},
                {label: "ssss", value: "ssss"},
              ]}
              label="cateogy"
              onSelect={item => console.log(item)}
            /> */}

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  label="category"
                  onChangeText={value => onChange(value)}
                  value={value}
                  errorText={errors.category?.message}
                />
              )}
              name="category"
              rules={{required: true}}
            />

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextField
                  label="description"
                  onChangeText={value => onChange(value)}
                  value={value}
                  errorText={errors.description?.message}
                />
              )}
              name="description"
              rules={{required: true}}
            />

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <CustomDatePicker handleOnChangeDate={date => onChange(date)} />
              )}
              name="date"
              rules={{required: true}}
            />

            <CustomButton
              label="Submit"
              style={styles.btn}
              onPress={handleSubmit(onSubmit)}
            />
          </RootScreen>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
  },

  root: {
    paddingHorizontal: ms(SIZES.padding),
    paddingTop: mvs(SIZES.padding),
  },
  title: {
    ...FONTS.h1,
    textAlign: "center",
    marginBottom: mvs(SIZES.margin),
  },
  btn: {
    marginTop: "auto",
    marginBottom: mvs(SIZES.margin * 6),
  },
});
