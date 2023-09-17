import syncToApi from '@/data/api';
import { showToast } from '@/data/helpers';
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

    /**
     * Syncs the local data to the API.
     * Then, notifies the user of the result.
     * 
     * @returns {void}
     */
    const onSync = (): void => {
        syncToApi()
            .then(() => {
                showToast(translator.get('NOTIFICATION_SYNC_SUCCESS'));
            }).catch(() => {
                showToast(translator.get('NOTIFICATION_SYNC_ERROR'));
            });
    };

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
        buttonContainer: {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
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
            <Text style={styles.text}>{translator.get('SYNC_TEXT')}</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={onSync}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {translator.get('LABEL_SYNC')}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Sync;