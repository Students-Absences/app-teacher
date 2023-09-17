import listItem from '@/data/types/list-item';
import { atom } from 'nanostores'

export const $assignments = atom<listItem[]>([]);

export const clearAssignments = () => {
    $assignments.set([]);
}

export const setAssignments = (assignments: listItem[]) => {
    $assignments.set(assignments);
}