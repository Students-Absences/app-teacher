import useColor from '@/hooks/useColor';
import { ReactNode, useEffect, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Picker from '@/components/fields/Picker';
import listItem from '@/types/list-item';
import { getTeachers } from '@/data/helpers';

const Absences = (): ReactNode => {
    const [teachers, setTeachers] = useState<listItem[]>([]);

    const color = useColor();

    useEffect(() => {
        // console.log('Absences mounted!'); //? debug
        getTeachers(setTeachers);
    }, []);

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