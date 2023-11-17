import { Image, ImageBackground, StyleSheet, Text } from 'react-native';

const logoImage = require('assets/logo.png');
const stageImage = require('assets/stage.jpg');

const ResultStage: React.FunctionComponent = () => {
    return (
        <ImageBackground source={stageImage} style={styles.stageImage} resizeMode="cover">
            <Image source={logoImage} />
            <Text style={styles.bottomText}>Einfach - Sicher - Schnell</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    stageImage: {
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomText: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#00000080',
        paddingHorizontal: 10,
        paddingVertical: 13,

        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: 'white',
    },
});

export { ResultStage };
