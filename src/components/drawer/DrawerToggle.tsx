import useDarkMode from '@/data/hooks/useDarkMode';
import useColor from '@/data/hooks/useColor';
import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
    Image,
    Pressable,
    StyleSheet
} from 'react-native';
import {
    DrawerActions,
    ParamListBase,
    useNavigation
} from '@react-navigation/native';

const DrawerToggle = () => {
    const color = useColor();
    const isDarkMode = useDarkMode();

    const hamburgerLogo = isDarkMode ?
        require('@/resources/images/hamburger-dark-theme.png') :
        require('@/resources/images/hamburger-light-theme.png');

    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const styles = StyleSheet.create({
        logo: {
            width: 42,
            height: 42
        },
        button: {
            backgroundColor: color.BACKGROUND_HIGH,
            color: color.TEXT_HIGH,
            marginLeft: 'auto'
        }
    });

    return (
        <Pressable
            onPress={openDrawer}
            style={styles.button}
        >
            <Image
                style={styles.logo}
                source={hamburgerLogo}
            />
        </Pressable>
    );
};

export default DrawerToggle;