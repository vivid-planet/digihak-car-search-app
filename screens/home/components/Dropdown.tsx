import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../../../utils/Constants";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

interface DropdownComponentProps {
  title: string;
  value: string | null;
  setValue: (value: string) => void;
}

const DropdownComponent: React.FunctionComponent<DropdownComponentProps> = ({
  title,
  value,
  setValue,
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocus && { color: colors.Primary300 }]}>
        {title}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.Primary300 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Bitte wählen" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: colors.Neutral300,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 12,
    top: 2,
    zIndex: 999,
    paddingHorizontal: 3,
    fontFamily: "OpenSans-Medium",
    fontSize: 13,
    color: colors.Neutral400,
  },
  placeholderStyle: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    color: colors.Neutral400,
  },
  selectedTextStyle: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
  },
});
