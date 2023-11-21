import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from 'utils/Constants';

interface StyledTextInputProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
}

const StyledTextInput: React.FunctionComponent<StyledTextInputProps> = ({ title, value, setValue }) => {
    const [isFocus, setIsFocus] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, isFocus && { color: colors.Primary300 }]}>{title}</Text>
            <TextInput
                style={[styles.inputText, isFocus && { borderColor: colors.Primary300 }]}
                value={value}
                onChange={(props) => setValue(props.nativeEvent.text)}
                placeholder="Bitte eingeben"
                keyboardType="numeric"
                selectionColor={colors.Primary800}
                placeholderTextColor={colors.Neutral400}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </View>
    );
};

export default StyledTextInput;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginBottom: 20,
    },
    inputText: {
        height: 50,
        borderColor: colors.Neutral300,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
        lineHeight: 22,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 12,
        top: 2,
        zIndex: 1,
        paddingHorizontal: 3,
        fontFamily: 'OpenSans-Medium',
        fontSize: 13,
        color: colors.Neutral400,
    },
});
