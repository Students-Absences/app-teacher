import { updateAbsenceItem } from '@/data/store/absence-items';
import absenceItem from '@/data/types/absence-item';
import useColor from '@/data/hooks/useColor';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const AbsenceItem = ({ props }: { props: absenceItem }): ReactNode => {
    const color = useColor();

    const onPress = () => updateAbsenceItem(props.id);

    const styles = StyleSheet.create({
        item: {
            backgroundColor: props.isAbsent ? color.BACKGROUND_ABSENT : undefined,
            borderRadius: 4,
            marginVertical: 4,
            padding: 4
        },
        itemText: {
            color: color.TEXT_HIGH,
            fontSize: 18
        }
    });

    return (
        <Pressable
            onPress={onPress}
            style={styles.item}
        >
            <Text style={styles.itemText}>
                {props.id} - {props.firstName} {props.lastName}
            </Text>
        </Pressable>
    );
};

export default AbsenceItem;