/**
 * @file Consts.ts
 * @description This file contains all the constants used in the application.
 * 
 * @author Stratis Dermanoutsos
 */

import route from '@/data/types/route';
import Absences from '@/screens/Absences';
import Home from '@/screens/Home';
import Sync from '@/screens/Sync';
import dbInfo from '@/data/types/db-info';

export const API_URL: string = 'http://localhost:3000/api';

export const DB_INFO: dbInfo = {
    fileName: 'students-absence.db',
    location: 'default'
};

export const ROUTES: route[] = [{
    routeKey: 'home',
    labelKey: 'LABEL_HOME',
    screen: Home
}, {
    routeKey: 'absences',
    labelKey: 'LABEL_ABSENCES',
    screen: Absences
}, {
    routeKey: 'sync',
    labelKey: 'LABEL_SYNC',
    screen: Sync
}];