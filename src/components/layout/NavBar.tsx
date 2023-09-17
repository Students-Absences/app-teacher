import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import DrawerToggle from '@/components/drawer/DrawerToggle';
import { ReactNode, useEffect, useState } from 'react';
import useColor from '@/hooks/useColor';
import appSettings from '@/data/types/app-settings';
import { getAppSettings } from '@/data/helpers';
import { useStore } from '@nanostores/react';
import { $settings } from '@/data/store/settings';

const NavBar = (): ReactNode => {
    const color = useColor();

    const settings = useStore($settings);

    useEffect(() => {
        // console.log('NavBar mounted!'); //? debug
        getAppSettings();
    }, []);

    const styles = StyleSheet.create({
        background: {
            alignItems: 'center',
            backgroundColor: color.BACKGROUND_HIGH,
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 8,
            zIndex: 2
        },
        logo: {
            width: 42,
            height: 45
        },
        text: {
            color: color.TEXT_HIGH,
            fontSize: 24,
            fontWeight: 'bold',
            marginLeft: 16
        }
    });

    return (
        <View style={styles.background}>
            {settings.schoolLogoUrl && <Image
                style={styles.logo}
                source={{ uri: settings.schoolLogoUrl }}
            />}
            <Text style={styles.text}>{settings.schoolName}</Text>
            <DrawerToggle />
        </View>
    );
};

export default NavBar;
