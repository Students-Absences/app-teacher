import textfieldProps from '@/data/types/textfield-props';
import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const TextField = (props: textfieldProps): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%'
        },
        label: {
            color: props.disabled ? color.TEXT_MEDIUM : color.TEXT_HIGH
        },
        input: {
            backgroundColor: color.BACKGROUND_MEDIUM,
            borderColor: props.disabled ? color.TEXT_LOW : color.TEXT_MEDIUM,
            borderRadius: 16,
            borderWidth: 1,
            fontSize: 18,
            paddingHorizontal: 16,
            width: '100%'
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {translator.get(props.labelKey)}
            </Text>
            <TextInput
                onChangeText={props.onChangeText}
                style={styles.input}
                value={props.value}
                placeholder={translator.get(props.placeholderKey)}
                placeholderTextColor={color.TEXT_LOW}
                secureTextEntry={props.isPin}
                textAlign={props.value === '' ? 'center' : 'left'}
                maxLength={props.maxLength || 5}
                keyboardType={props.isPin ? 'number-pad' : 'default'}
            />
        </View>
    );
};

export default TextField;