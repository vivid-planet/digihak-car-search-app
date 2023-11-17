import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Brands, Fuels, Models, Registrations } from 'api/types';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropdownComponent, { DropdownItem } from 'screens/home/components/Dropdown';
import { Stage } from 'screens/home/components/Stage';
import StyledTextInput from 'screens/home/components/StyledTextInput';
import { colors, environment } from 'utils/Constants';
import { RootStackParamList } from 'utils/types';
import { useFetch } from 'utils/useFetch';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const bottomInset = useSafeAreaInsets().bottom;

    const [selectedBrand, setSelectedBrand] = React.useState<DropdownItem | null>(null);
    const [selectedModel, setSelectedModel] = React.useState<DropdownItem | null>(null);
    const [selectedRegistration, setSelectedRegistration] = React.useState<DropdownItem | null>(null);
    const [selectedMileage, setSelectedMileage] = React.useState<string>('');
    const [selectedFuel, setSelectedFuel] = React.useState<DropdownItem | null>(null);

    const brandsUrl = `${environment.domain}/digihak-car-search/brands`;
    const { data: brandsData, loading: brandsLoading, error: brandsError } = useFetch<Brands[]>(brandsUrl);

    const modelsUrl =
        selectedBrand != null
            ? `${environment.domain}/digihak-car-search/cars/models?brandId=${selectedBrand?.value}`
            : null;
    const { data: modelsData, loading: modelsLoading, error: modelsError } = useFetch<Models[]>(modelsUrl);

    const registrationUrl =
        selectedModel != null && selectedBrand != null
            ? `${environment.domain}/digihak-car-search/cars/registrations?brandId=${selectedBrand?.value}&model=${selectedModel.value}`
            : null;
    const {
        data: registrationsData,
        loading: registrationLoading,
        error: registrationError,
    } = useFetch<Registrations[]>(registrationUrl);

    const fuelUrl =
        selectedModel != null && selectedBrand != null && selectedRegistration != null
            ? `${environment.domain}/digihak-car-search/cars/fuels?brandId=${selectedBrand?.value}&model=${selectedModel.value}&registration=${selectedRegistration.value}`
            : null;
    const { data: fuelsData, loading: fuelsLoading, error: fuelsError } = useFetch<Fuels[]>(fuelUrl);

    // reset other data, when brand is selected
    const onSelectBrand = (item: DropdownItem) => {
        setSelectedBrand(item);
        setSelectedModel(null);
        setSelectedRegistration(null);
        setSelectedMileage('');
        setSelectedFuel(null);
    };

    const onSubmitButtonPressed = () => {
        if (selectedBrand != null && selectedModel != null && selectedRegistration != null && selectedFuel != null) {
            navigation.push('Result', {
                brandId: selectedBrand.value,
                model: selectedModel.value,
                registration: selectedRegistration.value,
                mileage: selectedMileage,
                fuelId: selectedFuel.value,
            });
        }
    };

    const brandItems = brandsData?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }));

    const modelItems = modelsData?.map((item) => ({
        label: item.model,
        value: item.model,
    }));

    const registrationItems = registrationsData?.map((item) => ({
        label: item.initial_registration,
        value: item.initial_registration,
    }));

    const fuelItems = fuelsData?.map((item) => ({
        label: item.name,
        value: item.name === 'Benzin' ? '1' : '2', // TODO: helper function to resolve id, or even better, adapt API to add id
    }));

    const error = brandsError || modelsError || registrationError || fuelsError;
    const submitButtonDisabled =
        selectedBrand == null ||
        selectedModel == null ||
        selectedRegistration == null ||
        selectedMileage.length <= 0 ||
        selectedFuel == null;

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <Stage />
            <View style={[styles.textContainer, { paddingBottom: bottomInset + 20 }]}>
                <Text style={styles.descriptionText}>
                    Erhalte ohne Stress, schnell und einfach deinen besten Verkaufspreis.
                </Text>
                {error ? <Text style={[styles.descriptionText, { color: colors.Error }]}>{error}</Text> : null}
                <DropdownComponent
                    title="Marke"
                    value={selectedBrand}
                    setValue={onSelectBrand}
                    data={brandItems ?? []}
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
                <DropdownComponent
                    title="Erstzulassung"
                    value={selectedRegistration}
                    setValue={setSelectedRegistration}
                    data={registrationItems ?? []}
                    loading={registrationLoading}
                    disabled={registrationItems == null}
                />

                <StyledTextInput value={selectedMileage} setValue={setSelectedMileage} title="Kilometerstand" />

                <DropdownComponent
                    title="Kraftstoff"
                    value={selectedFuel}
                    setValue={setSelectedFuel}
                    data={fuelItems ?? []}
                    loading={fuelsLoading}
                    disabled={fuelItems == null}
                />
                <TouchableOpacity
                    style={[styles.touchableContainer, submitButtonDisabled && { backgroundColor: colors.Neutral300 }]}
                    onPress={onSubmitButtonPressed}
                    disabled={submitButtonDisabled}
                >
                    <Text style={styles.buttonText}>Jetzt Verkaufspreis erhalten</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        padding: 20,
    },
    descriptionText: {
        fontFamily: 'OpenSans-Medium',
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
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        lineHeight: 22,
    },
});

export { HomeScreen };
