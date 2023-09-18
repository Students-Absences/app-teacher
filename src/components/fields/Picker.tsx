import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import listItem from '@/data/types/list-item';
import pickerProps from '@/data/types/picker-props';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const Picker = (props: pickerProps): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        dropdown: {
            backgroundColor: color.BACKGROUND_HIGH,
            borderColor: color.BACKGROUND_HIGH,
            borderRadius: 8,
            borderWidth: 1
        },
        button: {
            backgroundColor: color.BACKGROUND_MEDIUM,
            borderColor: props.disabled ? color.TEXT_LOW : color.TEXT_MEDIUM,
            borderRadius: 16,
            borderWidth: 1,
            width: '100%'
        },
        buttonText: {
            color: props.disabled ? color.TEXT_LOW : color.TEXT_MEDIUM,
            fontSize: 18
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%'
        },
        label: {
            color: props.disabled ? color.TEXT_MEDIUM : color.TEXT_HIGH
        },
        row: {
            backgroundColor: color.BACKGROUND_HIGH
        },
        rowText: {
            color: color.TEXT_HIGH
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {translator.get(props.labelKey)}
            </Text>
            <SelectDropdown
                data={props.data}
                disabled={props.disabled}
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.button}
                buttonTextStyle={styles.buttonText}
                rowStyle={styles.row}
                rowTextStyle={styles.rowText}
                defaultButtonText={translator.get(props.placeholderKey)}
                onSelect={props.onSelect}
                buttonTextAfterSelection={(selectedItem: listItem, index) => {
                    return translator.getItem(selectedItem);
                }}
                rowTextForSelection={(item: listItem, index) => {
                    return translator.getItem(item);
                }}
            />
        </View>
    );
};

export default Picker;