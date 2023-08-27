import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Colors from '../../Colors';

const NavBar = (): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        background: {
            alignItems: 'center',
            backgroundColor: isDarkMode ? Colors.background_dark : Colors.background_lightest,
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 24,
            paddingVertical: 8,
            zIndex: 2
        },
        text: {
            color: isDarkMode ? Colors.text_dark_high : Colors.text_light_high,
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
                source={{ uri: 'https://5lykeiovyrona.gr/img/logo-mobile.png' }}
            />
            <Text style={styles.text}>5ο ΓΕΛ Βύρωνος</Text>
        </View>
    );
};

export default NavBar;
