import listItem from '@/data/types/list-item';
import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { executeQuery } from '@/data/database/db-service';
import table, { isListItem } from '@/data/enums/table';
import absence from '@/data/types/absence';
import appSettings from '@/data/types/app-settings';
import absenceItem from '@/data/types/absence-item';

/**
 * Select all teachers and return them as a combo item array.
 *
 * @param db The database connection.
 *
 * @returns {Promise<listItem[]>} All the teachers.
 */
export const getListItems = async (db: SQLiteDatabase, table: table): Promise<listItem[]> => {
    const listItems: listItem[] = [];

    try {
        const results = await executeQuery(db, 'SELECT_LISTITEM', [], table);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                const item = result.rows.item(index);

                listItems.push({
                    id: item.ID,
                    label: item.LABEL,
                    labelEn: item.LABELEN
                } as listItem);
            }
        });

        // console.log(`List: ${listItems}`); //? debug
    } catch (error) {
        console.error(error);
    }

    return listItems;
};

/**
 * Selects all absences and returns them.
 * 
 * @param db The database connection.
 * 
 * @returns {Promise<absence[]>}
 */
export const getAbsences = async (db: SQLiteDatabase): Promise<absence[]> => {
    let absences: absence[] = [];

    try {
        const results = await executeQuery(db, 'SELECT_ABSENCE');
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                const item = result.rows.item(index);

                absences.push({
                    id: item.ID,
                    minute: item.MINUTE,
                    hour: item.HOUR,
                    day: item.DAY,
                    month: item.MONTH,
                    year: item.YEAR,
                    studentId: item.STUDENTID,
                    assignmentId: item.ASSIGNMENTID
                } as absence);
            }
        });

        // console.log(`Absences count: ${absences.length}`); //? debug
    } catch (error) {
        console.error(error);
    }

    return absences;
};

/**
 * Selects the app's settings and returns them.
 * 
 * @param db The database connection.
 * 
 * @returns {Promise<appSettings>}
 */
export const getAppSettings = async (db: SQLiteDatabase): Promise<appSettings> => {
    let settings = {} as appSettings;

    try {
        const results = await executeQuery(db, 'SELECT_APPSETTINGS');
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                const item = result.rows.item(index);

                settings = {
                    schoolLogoUrl: item.SCHOOLLOGOURL,
                    schoolName: item.SCHOOLNAME
                };
            }
        });

        // console.log(`App settings: ${appSettings}`); //? debug
    } catch (error) {
        console.error(error);
    }

    return settings;
};

/**
 * Selects all assignments for teacher with the given id.
 *
 * @param db The database connection.
 * @param teacherId The teacher's id.
 *
 * @returns {Promise<listItem[]>} All the teacher's assignments.
 */
export const getTeacherAssignments = async (db: SQLiteDatabase, teacherId: number): Promise<listItem[]> => {
    const listItems: listItem[] = [];

    try {
        const results = await executeQuery(db, 'SELECT_ASSIGNMENTS_FOR_TEACHER', [teacherId]);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                const item = result.rows.item(index);

                listItems.push({
                    id: item.ID,
                    label: item.LABEL,
                    labelEn: item.LABELEN
                } as listItem);
            }
        });

        // console.log(`List: ${listItems}`); //? debug
    } catch (error) {
        console.error(error);
    }

    return listItems;
};

/**
 * Selects all students for assignment's classroom with the given id.
 * 
 * @param db The database connection.
 * @param assignmentId The assignment's id.
 * 
 * @returns {Promise<absenceItem[]>} All the assignment's students.
 */
export const getAbsenceItems = async (db: SQLiteDatabase, assignmentId: number): Promise<absenceItem[]> => {
    const absenceItems: absenceItem[] = [];

    try {
        const results = await executeQuery(db, 'SELECT_ABSENCE_ITEMS', [assignmentId]);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                const item = result.rows.item(index);

                absenceItems.push({
                    id: item.ID,
                    firstName: item.FIRSTNAME,
                    lastName: item.LASTNAME,
                    isAbsent: item.ISABSENT > 0
                } as absenceItem);
            }
        });

        // console.log(`List: ${absenceItems}`); //? debug
    } catch (error) {
        console.error(error);
    }

    return absenceItems;
};

/**
 * Insert data into the table provided.
 * 
 * @param db Τhe database connection.
 * @param table The table to be queried.
 * @param entries The entries to be inserted.
 * 
 * @returns {void}
 */
export const insertData = (db: SQLiteDatabase, table: table, entries: any[]): void => {
    let queryKey: string = isListItem[table] ?
        'INSERT_LISTITEM' :
        `INSERT_${table}`;

    try {
        const promises = entries.map(entry => executeQuery(db, queryKey, Object.values(entry), table));

        Promise.all(promises).then(values => {
            // console.log(`Inserted entries: ${entries}.`); //? debug
        });
    } catch (error) {
        console.error(error);
    }
};

/**
 * Creates all tables.
 * 
 * @param db The database connection.
 * 
 * @returns {Promise<void>}
 */
export const createAllTables = async (db: SQLiteDatabase): Promise<void> => {
    const tableKeys = Object.keys(table) as (keyof typeof table)[];
    const promises: Promise<[ResultSet]>[] = [];

    try {
        tableKeys.forEach(tableKey => {
            const tableName = table[tableKey] as table;
            let queryKey: string = isListItem[tableName] === 1 ?
                'CREATE_LISTITEM' :
                `CREATE_${tableName}`;

            promises.push(executeQuery(db, queryKey, [], tableName));
        });

        Promise.all(promises).then(values => {
            // console.log(`Created tables: ${tables}`); //? debug
        });
    } catch (error) {
        console.error(error);
    }
};

/**
 * Deletes all absences for the assignment with the given id.
 * 
 * @param db The database connection.
 * @param assignmentId The assignment's id.
 * @param day Day of the absence.
 * @param month Month of the absence.
 * @param year Year of the absence.
 * 
 * @returns {Promise<void>}
 */
export const deleteAbsencesForAssignment = async (
    db: SQLiteDatabase,
    assignmentId: number,
    day: number,
    month: number,
    year: number
): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await executeQuery(
                db, 
                'DELETE_ABSENCES_ASSIGNMENT',
                [assignmentId, day, month, year]
            );

            resolve();
        } catch (error) {
            console.error(error); //? Debug
            reject(error);
        }
    });
};

/**
 * Drops all tables.
 * 
 * @param db The database connection.
 * 
 * @returns {void}
 */
export const dropAllTables = (db: SQLiteDatabase): void => {
    doForAllTables(db, 'DROP_TABLE');
};

/**
 * Deletes all tables' data.
 * 
 * @param db The database connection.
 *
 * @returns {void}
 */
export const deleteFromAllTables = (db: SQLiteDatabase): void => {
    doForAllTables(db, 'DELETE_FROM');
};

/**
 * Executes a query for all tables.
 * 
 * @param db The database connection.
 * @param queryKey The query key to be used. (DROP_TABLE | DELETE_FROM)
 * 
 * @returns {Promise<void>}
 */
const doForAllTables = async (db: SQLiteDatabase, queryKey: string): Promise<void> => {
    const tableKeys = Object.keys(table) as (keyof typeof table)[];
    const promises: Promise<[ResultSet]>[] = [];

    try {
        tableKeys.forEach(tableKey => {
            const tableName = table[tableKey] as table;

            promises.push(executeQuery(db, queryKey, [], tableName));
        });

        Promise.all(promises).then(values => {
            // console.log(`Dropped tables: ${tableKeys}`); //? debug
        });
    } catch (error) {
        console.error(error);
    }
};
