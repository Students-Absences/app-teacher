export type absenceBackend = {
    studentId: number,
    assignmentId: number,
    dateIn: string
};

/**
 * References API's SyncIn class.
 * 
 * Reverted name for obvious reasons.
 */
interface syncOut {
    teacherId: number;
    teacherPin: string;
    absences: absenceBackend[];
};

export default syncOut;