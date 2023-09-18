import fieldProps from '@/data/types/field-props';
import React from 'react';

interface textfieldProps extends fieldProps {
    value: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    isPin?: boolean;
    maxLength?: number;
};

export default textfieldProps;