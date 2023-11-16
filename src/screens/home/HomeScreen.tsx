import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Brands, Models } from 'api/types';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropdownComponent, { DropdownItem } from 'screens/home/components/Dropdown';
import { Stage } from 'screens/home/components/Stage';
import { colors, environment } from 'utils/Constants';
import { RootStackParamList } from 'utils/types';
import { useFetch } from 'utils/useFetch';

const HomeScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const bottomInset = useSafeAreaInsets().bottom;

    const [selectedBrand, setSelectedBrand] = React.useState<DropdownItem | null>(null);
    const [selectedModel, setSelectedModel] = React.useState<DropdownItem | null>(null);

    const brandsUrl = `${environment.domain}/digihak-car-search/brands`;
    const { data: brandsData, loading: brandsLoading, error: brandsError } = useFetch<Brands[]>(brandsUrl);

    const modelsUrl =
        selectedBrand != null
            ? `${environment.domain}/digihak-car-search/cars/models?brandId=${selectedBrand?.value}`
            : null;
    const { data: modelsData, loading: modelsLoading, error: modelsError } = useFetch<Models[]>(modelsUrl);

    // reset other data, when brand is selected
    React.useEffect(() => {
        if (selectedBrand) setSelectedModel(null);
    }, [selectedBrand]);

    const brandItems = brandsData?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
    }));

    const modelItems = modelsData?.map((item) => ({
        label: item.model,
        value: item.model,
    }));

    const error = brandsError || modelsError;
    const submitButtonDisabled = selectedBrand == null && selectedModel == null;

    return (
        <ScrollView style={styles.container}>
            <Stage />
            <View style={[styles.textContainer, { paddingBottom: bottomInset + 20 }]}>
                <Text style={styles.descriptionText}>
                    Erhalte ohne Stress, schnell und einfach deinen besten Verkaufspreis.
                </Text>
                {error ? <Text style={[styles.descriptionText, { color: colors.Error }]}>{error}</Text> : null}
                <DropdownComponent
                    title="Marke"
                    value={selectedBrand}
                    setValue={setSelectedBrand}
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
                <TouchableOpacity
                    style={[styles.touchableContainer, submitButtonDisabled && { backgroundColor: colors.Neutral300 }]}
                    onPress={() => navigation.push('Result')}
                    disabled={submitButtonDisabled}
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
