import listItem from '@/data/types/list-item';
import fieldProps from '@/data/types/field-props';

interface pickerProps extends fieldProps {
    data: listItem[];
    onSelect: (item: listItem, index?: number) => void;
};

export default pickerProps;