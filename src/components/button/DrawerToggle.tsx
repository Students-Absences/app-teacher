import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
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
    const isDarkMode = useDarkMode();

    const hamburgerLogo = isDarkMode ?
        require('@/resources/hamburger-dark-theme.png') :
        require('@/resources/hamburger-light-theme.png');

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
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST,
            color: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
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