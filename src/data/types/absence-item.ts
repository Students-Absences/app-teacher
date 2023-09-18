import person from '@/data/types/person';
import { GestureResponderEvent } from 'react-native';

interface absenceItem extends person {
    isAbsent: boolean;
};

export default absenceItem;