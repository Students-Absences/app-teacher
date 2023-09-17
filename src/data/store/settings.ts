import appSettings from '@/data/types/app-settings';
import { atom } from 'nanostores'

const initialValues = {
    schoolName: 'Students Absence'
};

export const $settings = atom<appSettings>(initialValues);

export const clearSettings = () => {
    $settings.set(initialValues);
}

export const setSettings = (settings: appSettings) => {
    $settings.set(settings);
}