import { ReactNode } from 'react';
import { StyleSheet, VirtualizedList } from 'react-native';
import AbsenceItem from '@/components/absences/AbsenceItem';
import absenceItem from '@/data/types/absence-item';
import { $absenceItems } from '@/data/store/absence-items';
import { useStore } from '@nanostores/react';

const AbsenceGrid = (): ReactNode => {
    const absenceItems = useStore($absenceItems);

    const getItem = (data: absenceItem[], index: number) => data[index];
    const getItemCount = () => absenceItems.length;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    return (
        <VirtualizedList
            data={absenceItems}
            getItem={getItem}
            getItemCount={getItemCount}
            renderItem={({ item }: { item: absenceItem }) => <AbsenceItem props={item} />}
            style={styles.container}
        />
    );
};

export default AbsenceGrid;