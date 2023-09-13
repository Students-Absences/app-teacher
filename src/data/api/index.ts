import axios from 'axios';
import { getAbsences } from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import sync from '@/data/types/sync';
import { absenceDate } from '@/data/helpers';

axios.defaults.baseURL = 'http://10.0.2.2:5231/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        console.error(error);
    } finally {
        return syncData;
    }
};

export default syncToApi;