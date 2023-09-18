import useColor from '@/hooks/useColor';
import { ReactNode, useEffect, useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Picker from '@/components/fields/Picker';
import listItem from '@/data/types/list-item';
import {
    getAssignmentsForTeacher,
    getStudentsForAssignment,
    getTeachers,
    showToast
} from '@/data/helpers';
import { useStore } from '@nanostores/react';
import { $assignments, clearAssignments } from '@/data/store/assignments';
import { $teachers } from '@/data/store/teachers';
import { $absenceItems, clearAbsenceItems } from '@/data/store/absence-items';
import useLocalization from '@/hooks/useLocalization';
import AbsenceGrid from '@/components/absences/AbsenceGrid';

const Absences = (): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const teachers = useStore($teachers);
    const [selectedTeacher, setSelectedTeacher] = useState<listItem | null>(null);

    const assignments = useStore($assignments);
    const [selectedAssignment, setSelectedAssignment] = useState<listItem | null>(null);

    //* Get teachers on mount
    useEffect(() => {
        // console.log('Absences mounted!'); //? debug

        if (teachers.length > 0)
            return;

        getTeachers()
            .catch(error => {
                showToast(translator.get('NOTIFICATION_GET_TEACHERS_ERROR'));
            });
    }, []);

    //* Clear selected teacher on teachers change
    useEffect(() => {
        // console.log('Teachers changed!'); //? debug
        setSelectedTeacher(null);
    }, [teachers]);

    //* Clear assignments on selected teacher change
    useEffect(() => {
        // console.log('Selected teacher changed!'); //? debug

        if (!selectedTeacher)
            clearAssignments();
        else
            getAssignmentsForTeacher(selectedTeacher.id)
                .catch(error => {
                    showToast(translator.get('NOTIFICATION_GET_ASSIGNMENTS_ERROR'));
                });
        setSelectedAssignment(null);
    }, [selectedTeacher]);

    //* Get absence items on selected assignment change
    useEffect(() => {
        if (!selectedAssignment)
            clearAbsenceItems();
        else
            getStudentsForAssignment(selectedAssignment.id)
                .catch(error => {
                    showToast(translator.get('NOTIFICATION_GET_STUDENTS_ERROR'));
                });
    }, [selectedAssignment]);

    const onTeacherSelect = (item: listItem)=> setSelectedTeacher(item);
    const onAssignmentSelect = (item: listItem)=> setSelectedAssignment(item);

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            gap: 32,
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
                placeholderKey='PLACEHOLDER_TEACHER'
                labelKey='LABEL_TEACHER'
                onSelect={onTeacherSelect}
            />
            {selectedTeacher !== null && <Picker
                data={assignments}
                disabled={!selectedTeacher}
                placeholderKey='PLACEHOLDER_ASSIGNMENT'
                labelKey='LABEL_ASSIGNMENT'
                onSelect={onAssignmentSelect}
            />}
            {selectedAssignment !== null && <AbsenceGrid />}
        </View>
    );
};

export default Absences;