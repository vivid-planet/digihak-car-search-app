import { StyleSheet, Text, View } from 'react-native';

const StartScreen: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>DigiHAK Praxisworkshop</Text>
            <Text>react-native</Text>
            <Text>Expo</Text>
            <Text>Typescript</Text>
            <Text>ESLint</Text>
            <Text>Prettier</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        marginBottom: 10,
        fontSize: 30,
        fontFamily: 'OpenSans-Bold',
    },
});

export { StartScreen };
