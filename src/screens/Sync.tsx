import syncToApi from '@/data/api';
import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import { ReactNode } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const Sync = (): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            minHeight: '100%',
            paddingHorizontal: 16,
            paddingVertical: 64
        },
        text: {
            color: color.TEXT_HIGH,
            fontSize: 18,
            lineHeight: 20,
            paddingVertical: 8
        },
        button: {
            alignItems: 'center',
            backgroundColor: color.BACKGROUND_MEDIUM,
            borderRadius: 100,
            justifyContent: 'center',
            paddingHorizontal: 32,
            paddingVertical: 8,
            minWidth: '60%'
        },
        buttonText: {
            color: color.TEXT_MEDIUM,
            fontSize: 24
        }
    });

    return (
        <View style={styles.background}>
            <Pressable
                onPress={syncToApi}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{translator.get('LABEL_SYNC')}</Text>
            </Pressable>
        </View>
    );
};

export default Sync;