import listItem from '@/types/list-item';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { executeQuery } from '@/data/database/db-service';
import table from '@/data/enums/table';

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
        const results = await executeQuery(db, `SELECT_${table}`);
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
 * Insert data into the table provided.
 * 
 * @param db Τhe database connection.
 * @param table The table to be queried.
 * @param entries The entries to be inserted.
 */
export const insertData = async (db: SQLiteDatabase, table: table, entries: any[]): Promise<void> => {
    try {
        const promises = entries.map(entry => executeQuery(db, table, Object.values(entry)));

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
    try {
        const tableQueries = Object.values(table).map(table => `CREATE_${table}`);
        const promises = tableQueries.map(queryKey => executeQuery(db, queryKey));

        Promise.all(promises).then(values => {
            // console.log(`Created tables: ${tables}`); //? debug
        });
    } catch (error) {
        console.error(error);
    }
};
