import useColor from '@/hooks/useColor';
import { ReactNode, useEffect, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
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

    /**
     * Submits the absences to the local DB.
     */
    const onSubmit = (): void => {
        if (!selectedTeacher) {
            showToast(translator.get('PLACEHOLDER_TEACHER'));
            return;
        }

        if (!selectedAssignment) {
            showToast(translator.get('PLACEHOLDER_ASSIGNMENT'));
            return;
        }

        throw new Error('Not implemented'); // TODO: Implement
    };

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            gap: 32,
            minHeight: '100%',
            paddingHorizontal: 16,
            paddingVertical: 64
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
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonText: {
            color: color.TEXT_MEDIUM,
            fontSize: 24
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
            <AbsenceGrid />
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={onSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        {translator.get('LABEL_SUBMIT')}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Absences;