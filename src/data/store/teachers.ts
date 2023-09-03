import listItem from '@/types/list-item';
import { atom } from 'nanostores'

export const $teachers = atom<listItem[]>([])

export const clearTeachers = () => {
    $teachers.set([]);
}

export const setTeachers = (teachers: listItem[]) => {
    $teachers.set(teachers);
}