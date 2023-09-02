/**
 * @file Consts.ts
 * @description This file contains all the constants used in the application.
 * 
 * @author Stratis Dermanoutsos
 */

import route from '@/types/route';
import Absences from '@/screens/Absences';
import Home from '@/screens/Home';
import Sync from '@/screens/Sync';
import appSettings from './types/app-settings';
import listItem from './types/listItem';

export const API_URL: string = 'http://localhost:3000/api';

// TODO: Load from API (They should be set in the Admin webapp)
export const settings: appSettings = {
    schoolName: '5ο ΓΕΛ Βύρωνος',
    schoolLogoUrl: 'https://5lykeiovyrona.gr/img/logo-mobile.png'
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

export const teachers: listItem[] = [{
    id: 1,
    label: 'Ανδρέας Παπαδόπουλος',
    labelEn: 'Andreas Papadopoulos'
}, {
    id: 2,
    label: 'Μαρία Παπαδοπούλου',
    labelEn: 'Maria Papadopoulou'
}, {
    id: 3,
    label: 'Γιώργος Παπαδόπουλος',
    labelEn: 'George Papadopoulos'
}];