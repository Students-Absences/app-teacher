import { DB_INFO } from '@/consts';
import {
    Location,
    ResultSet,
    SQLError,
    SQLiteDatabase,
    enablePromise,
    openDatabase
} from 'react-native-sqlite-storage';
import { createAllTables, dropAllTables } from '@/data/database/db-methods';
import table from '@/data/enums/table';

enablePromise(true);

/**
 * Handle the result of the database connection.
 */
const handleConnectionResult = {
    success: () => console.log('Successfully opened the database.'),
    error: (e: SQLError) => console.error('Error occured trying to open the database: ' + e)
};

/**
 * Get the database connection.
 * 
 * @returns {Promise<SQLiteDatabase>} The database connection.
 */
export const getDbConnection = async (): Promise<SQLiteDatabase> => openDatabase({
    name: DB_INFO.fileName,
    location: DB_INFO.location as Location
}, handleConnectionResult.success, handleConnectionResult.error);

/**
 * Initializes the local Database based on the Constant values.
 */
export const initializeDb = async (): Promise<void> => {
    try {
        const db = await getDbConnection();

        // await dropAllTables(db);
        await createAllTables(db);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Execute a query.
 * This method was written to generalize the execution of queries.
 * 
 * @param db The database connection.
 * @param queryKey The query to be executed.
 * @param params The parameters to be passed to the query.
 * @param table The table to be queried. If the query is a list item query, the table name must be passed.
 *
 * @returns {Promise<[ResultSet]>} The results of the query.
 */
export const executeQuery = async (
    db: SQLiteDatabase,
    queryKey: string,
    params: any[] = [],
    table?: table | undefined
): Promise<[ResultSet]> => {
    const json = require('@/resources/queries.json');

    let queryString = json[queryKey].replace('{table_name}', table);

    // console.log(`${queryKey} -> ${queryString}`); //? debug

    return db.executeSql(queryString, params);
};