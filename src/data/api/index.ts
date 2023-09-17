import axios from 'axios';
import { deleteFromAllTables, getAbsences, insertData } from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import sync from '@/data/types/sync';
import { absenceDate, getAppSettings, getTeachers } from '@/data/helpers';
import table from '@/data/enums/table';

axios.defaults.baseURL = 'http://10.0.2.2:5231/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Syncs the local database to the API.
 * Then, repopulates the local database with the API's response.
 * 
 * @returns sync object
 */
const syncToApi = async (): Promise<sync> => {
    let syncData = {} as sync;

    try {
        const db = await getDbConnection();

        const absences: absence[] = await getAbsences(db);
        const data = JSON.stringify(absences.map(absence => {
            return {
                studentId: absence.studentId,
                assignmentId: absence.assignmentId,
                dateIn: absenceDate(absence)
            };
        }));
        // console.log(data); //? debug

        axios.post('/sync', data)
            .then(function (response) {
                syncData = response.data as sync;
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
            })
            .catch(function (error) {
                throw error;
            });

        return syncData;
    } catch (error) {
        // console.error(error); //? debug
        throw error;
    }
};

export default syncToApi;