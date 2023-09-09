import listItem from '@/data/types/list-item';

interface pickerProps {
    data: listItem[];
    labelKey: string;
    defaultButtonTextKey: string;
    onSelect: (item: listItem, index?: number) => void;
};

export default pickerProps;