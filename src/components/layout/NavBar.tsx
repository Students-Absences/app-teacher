import { Image, StyleSheet, Text, View } from 'react-native';
import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import { SCHOOL_LOGO, SCHOOL_NAME } from '@/Consts';

const NavBar = (): JSX.Element => {
    const isDarkMode = useDarkMode();

    const styles = StyleSheet.create({
        background: {
            alignItems: 'center',
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST,
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 8,
            zIndex: 2
        },
        text: {
            color: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
            fontSize: 24,
            fontWeight: 'bold',
            marginLeft: 16
        },
        logo: {
            width: 42,
            height: 45
        }
    });

    return (
        <View style={styles.background}>
            <Image
                style={styles.logo}
                source={{ uri: SCHOOL_LOGO }}
            />
            <Text style={styles.text}>{SCHOOL_NAME}</Text>
        </View>
    );
};

export default NavBar;
