import React, {useEffect, useRef, useState} from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import {COLORS, FONTS, SCALE, SIZES} from "../../constants";
import Typography from "./Typography";

const {s, vs, mvs, ms} = SCALE;

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
};

const TextField: React.FC<Props> = props => {
  const {label, errorText, value, style, onBlur, onFocus, ...restOfProps} =
    props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? COLORS.primary : COLORS.darkGrey;
  if (errorText) {
    color = COLORS.danger;
  }

  return (
    <View style={[{marginBottom: mvs(SIZES.margin)}, style]}>
      <View style={[styles.container]}>
        <TextInput
          style={[
            styles.input,

            {
              borderColor: color,
              color: COLORS.primary,
            },
          ]}
          ref={inputRef}
          {...restOfProps}
          value={value}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
        />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer,
              {backgroundColor: COLORS.white},
              {
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [vs(0), vs(-25)],
                    }),
                  },
                ],
              },
            ]}>
            <Typography
              style={[
                styles.label,
                {
                  color,
                },
              ]}>
              {label}
              {errorText ? "*" : ""}
            </Typography>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      {!!errorText && <Typography style={styles.error}>{errorText}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: vs(50),
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: s(SIZES.radius),
    height: "100%",
  },
  labelContainer: {
    position: "absolute",
    paddingHorizontal: ms(8),
    backgroundColor: COLORS.white,
    alignSelf: "flex-start",
    marginLeft: ms(10),
  },
  label: {
    ...FONTS.h4,
    textTransform: "capitalize",
    lineHeight: mvs(28),
  },
  error: {
    marginTop: mvs(4),
    marginLeft: ms(12),
    color: COLORS.danger,
    ...FONTS.h5,
  },
});

export default TextField;
