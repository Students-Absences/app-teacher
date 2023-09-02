import useColor from '@/hooks/useColor';
import { ReactNode } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { teachers } from '@/Consts';
import Picker from '@/components/fields/Picker';
import listItem from '@/types/listItem';

const Absences = (): ReactNode => {
    const color = useColor();

    const teacherSelected = (item: listItem) => {
        console.log(item.id);
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
        }
    });

    return (
        <View style={styles.background}>
            <Picker
                data={teachers}
                defaultButtonTextKey='LABEL_TEACHERS_DEFAULT'
                labelKey='LABEL_TEACHER'
                onSelect={teacherSelected}
            />
        </View>
    );
};

export default Absences;