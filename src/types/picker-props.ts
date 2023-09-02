import listItem from '@/types/list-item';

interface pickerProps {
    data: listItem[];
    labelKey: string;
    defaultButtonTextKey: string;
    onSelect: (item: listItem, index?: number) => void;
};

export default pickerProps;