import absenceItem from '@/data/types/absence-item';
import { atom } from 'nanostores'

export const $absenceItems = atom<absenceItem[]>([]);

export const clearAbsenceItems = () => {
    $absenceItems.set([]);
};

export const setAbsenceItems = (absenceItems: absenceItem[]) => {
    $absenceItems.set(absenceItems);
};

export const updateAbsenceItem = (id: number) => {
    const newAbsenceItems = [...$absenceItems.get()];

    const absenceItemIndex = newAbsenceItems.findIndex(item => item.id === id);
    newAbsenceItems[absenceItemIndex].isAbsent = !newAbsenceItems[absenceItemIndex].isAbsent;

    $absenceItems.set(newAbsenceItems);
};