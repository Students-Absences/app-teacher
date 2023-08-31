import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text } from 'react-native';
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native';

const DrawerToggle = () => {
    const isDarkMode = useDarkMode();

    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const styles = StyleSheet.create({
        button: {
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST,
            color: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
            marginLeft: 'auto'
        }
    });

    // TODO: Replace text
    return (
        <Pressable
            onPress={openDrawer}
            style={styles.button}
        >
            <Text>TEST</Text>
        </Pressable>
    );
};

export default DrawerToggle;