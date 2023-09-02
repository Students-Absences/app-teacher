/**
 * @file Consts.ts
 * @description This file contains all the constants used in the application.
 * 
 * @author Stratis Dermanoutsos
 */

import route from '@/types/_route';
import Absences from '@/screens/Absences';
import Home from '@/screens/Home';
import Sync from '@/screens/Sync';

export const API_URL: string = 'http://localhost:3000/api';

// TODO: Load from API (They should be set in the Admin webapp)
export const SCHOOL_NAME: string = '5ο ΓΕΛ Βύρωνος';
export const SCHOOL_LOGO: string = 'https://5lykeiovyrona.gr/img/logo-mobile.png';

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