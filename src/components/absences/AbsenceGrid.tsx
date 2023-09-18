import { ReactNode } from 'react';
import { StyleSheet, Text, VirtualizedList } from 'react-native';
import AbsenceItem from '@/components/absences/AbsenceItem';
import absenceItem from '@/data/types/absence-item';
import { $absenceItems } from '@/data/store/absence-items';
import { useStore } from '@nanostores/react';
import useLocalization from '@/hooks/useLocalization';
import useColor from '@/hooks/useColor';

const AbsenceGrid = (): ReactNode => {
    const translator = useLocalization();
    const colors = useColor();

    const absenceItems = useStore($absenceItems);

    const getItem = (data: absenceItem[], index: number) => data[index];
    const getItemCount = (): number => absenceItems.length;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        fallbackText: {
            color: colors.TEXT_LOW
        }
    });

    return (
        <>
        {getItemCount() > 0 ?
            <VirtualizedList
                data={absenceItems}
                getItem={getItem}
                getItemCount={getItemCount}
                renderItem={({ item }: { item: absenceItem }) => <AbsenceItem props={item} />}
                style={styles.container}
            /> : <Text style={styles.fallbackText}>{translator.get('LABEL_NO_STUDENTS')}</Text>}
        </>
    );
};

export default AbsenceGrid;