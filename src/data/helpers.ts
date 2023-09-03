import { getListItems } from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import table from '@/data/enums/table';
import { setTeachers } from '@/data/store/teachers';

/**
 * Gets the list of teachers from the database and updates the state of the component calling it.
 * 
 * @param setTeachers State setter function for teachers
 */
export const getTeachers = async () => {
    try {
        const db = await getDbConnection();

        const teachersFromDb = await getListItems(db, table.teachers);
        // console.log('Teachers stored: ' + teachersFromDb); //? debug
        setTeachers(teachersFromDb);
    } catch (error) {
        console.error(error);
    }
};