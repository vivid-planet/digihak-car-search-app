import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Rating } from 'api/types';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { colors, environment } from 'utils/Constants';
import { RootStackParamList } from 'utils/types';
import { useFetch } from 'utils/useFetch';

import { ResultStage } from './components/ResultStage';

export interface ResultScreenNavigationParams {
    brandId: string;
    model: string;
    registration: string;
    mileage: string;
    fuelId: string;
}

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;
const carImage = require('assets/car.png');

const ResultScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<ResultScreenRouteProp>();

    const { brandId, model, registration, mileage, fuelId } = route.params;

    const ratingUrl = `${environment.domain}/digihak-car-search/cars/rating?brandId=${brandId}&model=${model}&registration=${registration}&mileage=${mileage}&fuelId=${fuelId}`;
    // TODO: handle loading and error
    const { data } = useFetch<Rating>(ratingUrl);

    return (
        <View style={styles.container}>
            <ResultStage />
            <View style={styles.textContainer}>
                <Text style={styles.headline}>Deine Fahrzeugbewertung</Text>
                <Text style={styles.description}>Beschreibung</Text>
                <View style={styles.centerContainer}>
                    <Image style={styles.image} source={carImage} />
                    <View style={styles.ratingContainer}>
                        <Text style={styles.valueText}>{`${data?.rating.minValue} €`}</Text>
                        <Text style={styles.tillText}>bis</Text>
                        <Text style={styles.valueText}>{`${data?.rating.maxValue} €`}</Text>
                    </View>
                </View>
                <Button title="Neue Bewertung" onPress={() => navigation.pop()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textContainer: {
        padding: 20,
    },
    headline: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        lineHeight: 32,
        marginBottom: 20,
    },
    description: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
        lineHeight: 22,
        color: colors.Neutral400,
        marginBottom: 20,
    },
    image: {
        marginBottom: 20,
    },
    centerContainer: {
        alignItems: 'center',
    },
    ratingContainer: {
        backgroundColor: colors.Primary050,
        borderColor: colors.Primary300,
        borderRadius: 8,
        borderWidth: 1,
        padding: 15,
        paddingBottom: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    valueText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        lineHeight: 32,
        color: colors.Primary800,
    },
    tillText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        lineHeight: 22,
        color: colors.Primary800,
        marginHorizontal: 10,
    },
});

export { ResultScreen };
