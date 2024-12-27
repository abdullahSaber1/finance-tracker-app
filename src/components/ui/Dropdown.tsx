import React, {FC, ReactElement, useCallback, useRef, useState} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import {COLORS, ICONS, SCALE, SIZES, FONTS} from "../../constants";
import Typography from "./Typography";

const {s, ms, vs, mvs} = SCALE;
const {ArrowIconTop} = ICONS;

type Item = {
  label: string;
  value: string;
};

interface Props {
  label: string;
  data: Item[];
  onSelect: (item: {label: string; value: string}) => void;
}

const Dropdown: FC<Props> = ({label, data, onSelect}) => {
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Item | undefined>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = useCallback(
    ({item}: {item: Item}): ReactElement<any, any> => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Typography style={{...FONTS.h3}}>{item.label}</Typography>
      </TouchableOpacity>
    ),
    [],
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Typography style={[styles.buttonText, {...FONTS.h3}]}>
        {(selected && selected.label) || label}
      </Typography>
      <ArrowIconTop
        width={s(24)}
        height={s(24)}
        style={{transform: [{scaleY: visible ? -1 : 1}]}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    height: vs(50),
    zIndex: 1,
    borderRadius: s(SIZES.radius),
    marginBottom: mvs(SIZES.margin),
    paddingHorizontal: ms(SIZES.padding),
  },
  buttonText: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: "90%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: s(SIZES.radius),
    marginTop: mvs(10),
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Dropdown;
