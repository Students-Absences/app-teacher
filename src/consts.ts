/**
 * @file Consts.ts
 * @description This file contains all the constants used in the application.
 * 
 * @author Stratis Dermanoutsos
 */

import route from '@/data/types/route';
import Absences from '@/components/screens/Absences';
import Home from '@/components/screens/Home';
import Sync from '@/components/screens/Sync';
import dbInfo from '@/data/types/db-info';

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

export const SUPERVISOR = {
    id: 1000000,
    pin: '1928'
};
