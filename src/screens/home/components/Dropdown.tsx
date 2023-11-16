import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from 'utils/Constants';

export interface DropdownItem {
    label: string;
    value: string;
}

interface DropdownComponentProps {
    title: string;
    value: DropdownItem | null;
    setValue: (value: DropdownItem) => void;
    data: DropdownItem[];
    loading: boolean;
    disabled?: boolean;
}

const DropdownComponent: React.FunctionComponent<DropdownComponentProps> = ({
    title,
    value,
    setValue,
    data,
    loading,
    disabled,
}) => {
    const [isFocus, setIsFocus] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, isFocus && { color: colors.Primary300 }]}>{title}</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: colors.Primary300 }]}
                containerStyle={styles.modalContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                mode="modal"
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Bitte wählen' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item);
                    setIsFocus(false);
                }}
                renderLeftIcon={(visible) => (loading ? <ActivityIndicator /> : undefined)}
                disable={disabled}
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
    modalContainer: {
        maxHeight: 300,
    },
    dropdown: {
        height: 50,
        borderColor: colors.Neutral300,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
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
    placeholderStyle: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
        color: colors.Neutral400,
    },
    selectedTextStyle: {
        fontFamily: 'OpenSans-Medium',
        fontSize: 16,
    },
});
