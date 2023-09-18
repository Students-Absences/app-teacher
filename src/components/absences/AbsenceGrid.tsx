import { ReactNode } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import AbsenceItem from '@/components/absences/AbsenceItem';
import absenceItem from '@/data/types/absence-item';
import { $absenceItems } from '@/data/store/absence-items';
import { useStore } from '@nanostores/react';
import useLocalization from '@/hooks/useLocalization';
import useColor from '@/hooks/useColor';

const AbsenceGrid = (): ReactNode => {
    const translator = useLocalization();
    const color = useColor();

    const absenceItems = useStore($absenceItems);

    const getItem = (data: absenceItem[], index: number) => data[index];
    const getItemCount = (): number => absenceItems.length;

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: 4,
        },
        grid: {
            backgroundColor: color.BACKGROUND_MEDIUM,
            borderColor: color.TEXT_MEDIUM,
            borderRadius: 16,
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 8
        },
        label: {
            color: color.TEXT_HIGH
        },
        fallbackText: {
            color: color.TEXT_LOW
        }
    });

    return (
        <>
        {getItemCount() > 0 ?
            <View style={styles.container}>
                <Text style={styles.label}>
                    {translator.get('LABEL_STUDENTS')}
                </Text>
                <VirtualizedList
                    data={absenceItems}
                    getItem={getItem}
                    getItemCount={getItemCount}
                    renderItem={({ item }: { item: absenceItem }) => <AbsenceItem props={item} />}
                    style={styles.grid}
                />
            </View> :
            <Text style={styles.fallbackText}>
                {translator.get('LABEL_NO_STUDENTS')}
            </Text>}
        </>
    );
};

export default AbsenceGrid;