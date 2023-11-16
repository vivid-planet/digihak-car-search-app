import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from 'utils/types';

const ResultScreen: React.FunctionComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <Button title="Go Back" onPress={() => navigation.pop()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'aqua',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { ResultScreen };
