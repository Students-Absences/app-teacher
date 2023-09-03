import { getAppSettings, getListItems } from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import table from '@/data/enums/table';
import { setTeachers } from '@/data/store/teachers';
import appSettings from '@/types/app-settings';

/**
 * Gets the list of teachers from the database and updates the state of the component calling it.
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

/**
 * Gets the app's settings from the database and updates the state of the component calling it.
 * 
 * @param setSettings State setter function for app's settings
 */
export const getAppSettingsFromDb = async (setSettings: React.Dispatch<React.SetStateAction<appSettings>>) => {
    try {
        const db = await getDbConnection();

        const settingsFromDb = await getAppSettings(db);
        // console.log('Settings: ' + teachersFromDb); //? debug
        setSettings(settingsFromDb);
    } catch (error) {
        console.error(error);
    }
};