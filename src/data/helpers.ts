import {
    getAppSettings as getAppSettingsFromDb,
    getListItems
} from '@/data/database/db-methods';
import { getDbConnection } from '@/data/database/db-service';
import table from '@/data/enums/table';
import { setTeachers } from '@/data/store/teachers';
import { setSettings } from '@/data/store/settings';

/**
 * Gets the list of teachers from the database and updates the state of the component calling it.
 */
export const getTeachers = async (): Promise<void> => {
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
export const getAppSettings = async (): Promise<void> => {
    try {
        const db = await getDbConnection();

        const settingsFromDb = await getAppSettingsFromDb(db);
        // console.log('Settings: ' + settingsFromDb); //? debug
        setSettings(settingsFromDb);
    } catch (error) {
        console.error(error);
    }
};

/**
 * Formats the date from an absence into a string that can be sent to the API.
 * 
 * @param absence The absence to get the date from.
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