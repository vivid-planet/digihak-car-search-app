import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { colors } from "../../utils/Constants";
import DropdownComponent from "./components/Dropdown";
import { Stage } from "./components/Stage";

const HomeScreen: React.FunctionComponent = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [brand, setBrand] = React.useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Stage />
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>
          Erhalte ohne Stress, schnell und einfach deinen besten Verkaufspreis.
        </Text>
        <DropdownComponent title="Marke" value={brand} setValue={setBrand} />
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => navigation.push("Result")}
          disabled={brand != null}
        >
          <Text style={styles.buttonText}>Jetzt Verkaufspreis erhalten</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    padding: 20,
    paddingBottom: 300,
  },
  descriptionText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  touchableContainer: {
    backgroundColor: colors.Primary300,
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 17,
  },
  buttonText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 18,
    lineHeight: 22,
  },
});

export { HomeScreen };
