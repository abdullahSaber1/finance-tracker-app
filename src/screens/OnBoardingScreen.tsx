import {StyleSheet, Text, View, Image} from "react-native";
import React from "react";
import {CustomButton, RootScreen} from "../components";
import {COLORS, IMAGES, FONTS, SCALE, SIZES} from "../constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/RootNavigation";
import Typography from "../components/ui/Typography";
import {useAppDispatch} from "../store/configureStore";
import {toggelOnBoarding} from "../store/slices/settingSlice";

const {s, vs, ms, mvs} = SCALE;

type Props = NativeStackScreenProps<RootStackParamList, "onBoarding"> & {};

const OnBoardingScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <RootScreen style={styles.root}>
      <Image
        source={IMAGES.onBoardingImage}
        style={styles.image}
        resizeMode="cover"
      />
      <Typography color={COLORS.primary} style={styles.title}>
        spend smarter {"\n"} save more
      </Typography>

      <CustomButton
        label="Get Started"
        onPress={() => {
          dispatch(toggelOnBoarding(true));
          navigation.navigate("MainApp");
        }}
        style={styles.btn}
      />
    </RootScreen>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: ms(SIZES.padding),
    alignItems: "center",
  },
  image: {
    width: s(300),
    height: vs(300),
    marginTop: mvs(SIZES.base * 8),
  },
  title: {
    ...FONTS.h1,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: mvs(SIZES.margin),
  },
  btn: {
    marginBottom: mvs(SIZES.base * 8),
  },
});
