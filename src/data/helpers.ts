import {
    deleteAbsencesForAssignment,
    getAbsenceItems,
    getAppSettings as getAppSettingsFromDb,
    getListItems,
    getTeacherAssignments,
    insertData
} from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import table from '@/data/enums/table';
import absence from '@/data/types/absence';
import { setTeachers } from '@/data/store/teachers';
import { setSettings } from '@/data/store/settings';
import { setAssignments } from '@/data/store/assignments';
import { ToastAndroid } from 'react-native';
import { setAbsenceItems } from '@/data/store/absence-items';
import absenceItem from '@/data/types/absence-item';

/**
 * Gets the list of teachers from the database and updates the state of the component calling it.
 * 
 * @returns {Promise<void>}
 */
export const getTeachers = async (): Promise<void> => {
    try {
        const db = await getDbConnection();

        const teachersFromDb = await getListItems(db, table.teachers);
        // console.log('Teachers stored: ' + teachersFromDb); //? debug
        setTeachers(teachersFromDb);
    } catch (error) {
        console.error(error); //? Debug
        throw error;
    }
};

/**
 * Gets the app's settings from the database and updates the state of the component calling it.
 * 
 * @returns {Promise<void>}
 */
export const getAppSettings = async (): Promise<void> => {
    try {
        const db = await getDbConnection();

        const settingsFromDb = await getAppSettingsFromDb(db);
        // console.log('Settings: ' + settingsFromDb); //? debug
        setSettings(settingsFromDb);
    } catch (error) {
        console.error(error); //? Debug
        throw error;
    }
};

/**
 * Gets the assignments for a teacher from the database and updates the state of the component calling it.
 * 
 * @param teacherId The teacher's id.
 * 
 * @returns {Promise<void>}
 */
export const getAssignmentsForTeacher = async (teacherId: number): Promise<void> => {
    try {
        const db = await getDbConnection();

        const assignmentsFromDb = await getTeacherAssignments(db, teacherId);
        // console.log('Assignments: ' + assignmentsFromDb); //? debug
        setAssignments(assignmentsFromDb);
    } catch (error) {
        console.error(error); //? Debug
        throw error;
    }
};

/**
 * Gets the students for an assignment from the database and updates the state of the component calling it.
 * 
 * @param assignmentId The assignment's id.
 * 
 * @returns {Promise<void>}
 */
export const getStudentsForAssignment = async (assignmentId: number): Promise<void> => {
    try {
        const db = await getDbConnection();

        const studentsFromDb = await getAbsenceItems(db, assignmentId);
        // console.log('Students: ' + studentsFromDb); //? debug
        setAbsenceItems(studentsFromDb);
    } catch (error) {
        console.error(error); //? Debug
        throw error;
    }
};

/**
 * Inserts the list of absence items into the database.
 * 
 * @param data The list of absence items to insert.
 * @param assignmentId The assignment's id.
 * 
 * @returns {Promise<void>}
 */
export const insertAbsenceItems = (data: absenceItem[], assignmentId: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getDbConnection();

            //* Prepare the date
            const now = new Date();
            // console.log(`Now: ${paddedString(now.getFullYear())
            //     }-${paddedString(now.getMonth() + 1)
            //     }-${paddedString(now.getDate())
            //     }T${paddedString(now.getHours())
            //     }:${paddedString(now.getMinutes())
            //     }:00.000Z`); //? debug

            deleteAbsencesForAssignment(db, assignmentId, now.getDate(), now.getMonth() + 1, now.getFullYear())
                .then(() => {
                    //* Get the absent students
                    const absences: absence[] = data
                        .filter(item => item.isAbsent)
                        .map(absenceItem => {
                            return {
                                studentId: absenceItem.id,
                                assignmentId: assignmentId,
                                day: now.getDate(),
                                month: now.getMonth() + 1,
                                year: now.getFullYear(),
                                hour: now.getHours(),
                                minute: now.getMinutes()
                            } as absence;
                        });
                    // console.log(`Items count: ${absences.length}`); //? debug

                    if (absences.length > 0)
                        insertData(db, table.absences, absences);
                })
                .then(() => resolve())
                .catch(error => {
                    console.error(error); //? Debug
                    reject(error);
                });
        } catch (error) {
            console.error(error); //? Debug
            reject(error);
        }
    });
};

/**
 * Formats the date from an absence into a string that can be sent to the API.
 * 
 * @param absence The absence to get the date from.
 * 
 * @returns The date in the format YYYY-MM-DDTHH:MM:SS.000Z
 */
export const absenceDate = (absence: absence): string => {
    return `${
        paddedString(absence.year)
    }-${
        paddedString(absence.month)
    }-${
        paddedString(absence.day)
    }T${
        paddedString(absence.hour)
    }:${
        paddedString(absence.minute)
    }:00.000Z`;
};

/**
 * Pads a number with a leading zero if it is less than 10.
 * 
 * @param value The number to pad.
 * 
 * @returns The padded string.
 * 
 * @example
 * paddedString(1) // returns '01'
 * paddedString(10) // returns '10'
 * paddedString(100) // returns '100'
 */
const paddedString = (value: number): string => {
    return value.toString().padStart(2, '0');
}

/**
 * Shows a toast message to the user.
 * 
 * @param message The message to show.
 * @param duration The duration to show the message for. (ToastAndroid.SHORT | ToastAndroid.LONG)
 * 
 * @returns {void}
 * 
 * @example
 * showToast(translator.get('NOTIFICATION_SYNC_SUCCESS'));
 * showToast('Hello!', ToastAndroid.LONG);
 */
export const showToast = (message: string, duration = ToastAndroid.SHORT): void => {
    ToastAndroid.show(
        message,
        duration
    );
};