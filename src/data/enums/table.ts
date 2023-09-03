enum table {
    absences = 'ABSENCE',
    appSettings = 'APPSETTINGS',
    assignments = 'ASSIGNMENT',
    classrooms = 'CLASSROOM',
    reasons = 'REASON',
    students = 'STUDENT',
    studentClassrooms = 'STUDENTCLASSROOM',
    subjects = 'SUBJECT',
    teachers = 'TEACHER'
};

enum isListItem {
    'ABSENCE' = 0,
    'APPSETTINGS' = 0,
    'ASSIGNMENT' = 0,
    'CLASSROOM' = 1,
    'REASON' = 1,
    'STUDENT' = 0,
    'STUDENTCLASSROOM' = 0,
    'SUBJECT' = 1,
    'TEACHER' = 1
}

export default table;
export { isListItem };