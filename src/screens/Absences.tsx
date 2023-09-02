import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { teachers } from '@/Consts';
import Picker from '@/components/fields/Picker';

const Absences = (): ReactNode => {
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
        }
    });

    return (
        <View style={styles.background}>
            <Picker
                data={teachers}
                defaultButtonTextKey='LABEL_TEACHERS_DEFAULT'
                labelKey='LABEL_TEACHER'
                onSelect={() => {}}
            />
        </View>
    );
};

export default Absences;