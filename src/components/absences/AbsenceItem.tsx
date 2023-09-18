import { updateAbsenceItem } from '@/data/store/absence-items';
import absenceItem from '@/data/types/absence-item';
import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

const AbsenceItem = ({ props }: { props: absenceItem }): ReactNode => {
    const onPress = () => updateAbsenceItem(props.id);

    return (
        <Pressable
            onPress={onPress}
        >
            <Text>{props.firstName} {props.lastName}</Text>
        </Pressable>
    );
};

export default AbsenceItem;