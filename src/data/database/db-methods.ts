import listItem from '@/data/types/list-item';
import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { executeQuery } from '@/data/database/db-service';
import table, { isListItem } from '@/data/enums/table';
import appSettings from '@/data/types/app-settings';

/**
 * Select all teachers and return them as a combo item array.
 *
 * @param db The database connection.
 *
 * @returns {Promise<SelectItem[]>} All the teachers.
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

export const getAppSettings = async (db: SQLiteDatabase): Promise<any> => {
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
 * Insert data into the table provided.
 * 
 * @param db Τhe database connection.
 * @param table The table to be queried.
 * @param entries The entries to be inserted.
 */
export const insertData = async (db: SQLiteDatabase, table: table, entries: any[]): Promise<void> => {
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
 * Create all tables.
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
