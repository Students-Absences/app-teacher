import axios from 'axios';
import { deleteFromAllTables, getAbsences, insertData } from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import absence from '@/data/types/absence';
import syncIn from '@/data/types/sync-in';
import syncOut, { absenceBackend } from '@/data/types/sync-out';
import { absenceDate, getAppSettings, getTeachers, showToast } from '@/data/helpers';
import table from '@/data/enums/table';

axios.defaults.baseURL = 'http://10.0.2.2:5231/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Syncs the local database to the API.
 * Then, repopulates the local database with the API's response.
 * 
 * @param teacherId The teacher's id.
 * @param teacherPin The teacher's pin.
 * 
 * @returns sync object
 */
const syncToApi = async (teacherId: number, teacherPin: string): Promise<syncIn> => {
    return new Promise(async (resolve, reject) => {
        let syncData = {} as syncIn;

        try {
            const db = await getDbConnection();

            const absences: absence[] = await getAbsences(db);
            const data = JSON.stringify({
                teacherId: teacherId,
                teacherPin: teacherPin,
                absences: absences.map(absence => {
                    return {
                        studentId: absence.studentId,
                        assignmentId: absence.assignmentId,
                        dateIn: absenceDate(absence)
                    } as absenceBackend;
                })
            } as syncOut);
            // console.log(data); //? debug

            axios.post('/sync', data)
                .then(function (response) {
                    if (response.status !== 200)
                        reject(response.statusText);

                    syncData = response.data as syncIn;
                    // console.log(syncData); //? debug

                    // Clear all tables
                    deleteFromAllTables(db);

                    // Repopulate tables with response data
                    insertData(db, table.appSettings, [syncData.appSettings]);
                    insertData(db, table.assignments, syncData.assignments);
                    insertData(db, table.classrooms, syncData.classrooms);
                    insertData(db, table.students, syncData.students);
                    insertData(db, table.studentClassrooms, syncData.studentClassrooms);
                    insertData(db, table.subjects, syncData.subjects);
                    insertData(db, table.teachers, syncData.teachers);

                    // Update state
                    getTeachers();
                    getAppSettings();

                    resolve(syncData);
                })
                .catch(function (error) {
                    // console.error(error); //? debug
                    reject(error);
                });
        } catch (error) {
            // console.error(error); //? debug
            reject(error);
        }
    });
};

export default syncToApi;