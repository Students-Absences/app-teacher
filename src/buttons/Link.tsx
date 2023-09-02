import Route from '@/types/Route';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Pressable } from 'react-native';

const Link = (props: Route & {
    style?: any,
    children: ReactNode
}) => {
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const goTo = () => {
        console.log('Link.onPress', props.routeKey)
        navigation.navigate(props.routeKey);
    };

    return (
        <Pressable
            onPress={goTo}
            style={props?.style}
        >
            {props.children}
        </Pressable>
    );
};

export default Link;