import appSettings from '@/data/types/app-settings';
import assignment from '@/data/types/assignment';
import listItem from '@/data/types/list-item';
import person from '@/data/types/person';
import studentClassroom from '@/data/types/student-classroom';

interface sync {
    appSettings: appSettings;
    assignments: assignment[];
    classrooms: listItem[];
    students: person[];
    studentClassrooms: studentClassroom[];
    subjects: listItem[];
    teachers: listItem[];
};

export default sync;