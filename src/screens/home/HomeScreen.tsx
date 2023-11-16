import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Brands, Models } from "api/types";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropdownComponent, {
  DropdownItem,
} from "screens/home/components/Dropdown";
import { Stage } from "screens/home/components/Stage";
import { colors, environment } from "utils/Constants";
import { RootStackParamList } from "utils/types";
import { useFetch } from "utils/useFetch";

const HomeScreen: React.FunctionComponent = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedBrand, setSelectedBrand] = React.useState<DropdownItem | null>(
    null
  );
  const [selectedModel, setSelectedModel] = React.useState<DropdownItem | null>(
    null
  );

  const brandsUrl = `${environment.domain}/digihak-car-search/brands`;
  const {
    data: brandsData,
    loading: brandsLoading,
    error: brandsError,
  } = useFetch<Brands[]>(brandsUrl);

  const modelsUrl =
    selectedBrand != null
      ? `${environment.domain}/digihak-car-search/cars/models?brandId=${selectedBrand?.value}`
      : null;
  const {
    data: modelsData,
    loading: modelsLoading,
    error: modelsError,
  } = useFetch<Models[]>(modelsUrl);

  /* 
  cars/rating?brandId=1&model=mustang&registration=2016&mileage=20000&fuelId=1
  brandId (= required)
model (= required)
registration (= required)
mileage (= required)
fuelId (= required)*/

  const brandItems: DropdownItem[] = brandsData
    ? brandsData.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

  const modelItems: DropdownItem[] | undefined = modelsData?.map((item) => ({
    label: item.model,
    value: item.model,
  }));

  const error = brandsError || modelsError;

  return (
    <ScrollView style={styles.container}>
      <Stage />
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>
          Erhalte ohne Stress, schnell und einfach deinen besten Verkaufspreis.
        </Text>
        {error ? (
          <Text style={[styles.descriptionText, { color: colors.Error }]}>
            {error}
          </Text>
        ) : null}
        <DropdownComponent
          title="Marke"
          value={selectedBrand}
          setValue={setSelectedBrand}
          data={brandItems}
          loading={brandsLoading}
        />
        <DropdownComponent
          title="Modell"
          value={selectedModel}
          setValue={setSelectedModel}
          data={modelItems ?? []}
          loading={modelsLoading}
          disabled={modelItems == null}
        />
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => navigation.push("Result")}
          disabled={selectedBrand != null}
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
