import Picker from '@/components/fields/Picker';
import TextField from '@/components/fields/TextField';
import syncToApi from '@/data/api';
import { getTeachers, showToast } from '@/data/helpers';
import { $teachers } from '@/data/store/teachers';
import listItem from '@/data/types/list-item';
import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import { useStore } from '@nanostores/react';
import { ReactNode, useEffect, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const Sync = (): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const teachers = useStore($teachers);
    const [selectedTeacher, setSelectedTeacher] = useState<listItem | null>(null);

    const [pin, setPin] = useState<string>('');

    //* Get teachers on mount
    useEffect(() => {
        // console.log('Absences mounted!'); //? debug

        if (teachers.length > 0)
            return;

        getTeachers().catch(error => {
            showToast(translator.get('NOTIFICATION_GET_TEACHERS_ERROR'));
        });
    }, []);

    //* Reset pin on teacher change
    useEffect(() => {
        setPin('');
    }, [selectedTeacher]);

    /**
     * Syncs the local data to the API.
     * Then, notifies the user of the result.
     * 
     * @returns {void}
     */
    const onSync = (): void => {
        if (!selectedTeacher) {
            showToast(translator.get('PLACEHOLDER_TEACHER'));
            return;
        }

        syncToApi(
            selectedTeacher.id,
            pin)
            .then(() => {
                showToast(translator.get('NOTIFICATION_SYNC_SUCCESS'));
            })
            .catch(() => {
                showToast(translator.get('NOTIFICATION_SYNC_ERROR'));
            });
    };

    const onTeacherSelect = (item: listItem) => setSelectedTeacher(item);

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
        textWarning: {
            color: color.TEXT_WARNING
        },
        formContainer: {
            alignItems: 'center',
            flex: 1,
            gap: 32,
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
            <Text style={styles.text}>
                {translator.get('SYNC_TEXT')}
            </Text>
            <Text style={styles.textWarning}>
                {translator.get('SYNC_TEXT_WARNING')}
            </Text>
            <View style={styles.formContainer}>
                <Picker
                    data={teachers}
                    placeholderKey='PLACEHOLDER_TEACHER'
                    labelKey='LABEL_YOU_ARE'
                    onSelect={onTeacherSelect}
                />
                <TextField
                    labelKey='LABEL_PIN'
                    placeholderKey='PLACEHOLDER_PIN'
                    onChangeText={setPin}
                    value={pin}
                    isPin
                />
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