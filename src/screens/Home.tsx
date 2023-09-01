import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import useLocalization from '@/hooks/useLocalization';
import { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Home = (props: any): ReactNode => {
    const isDarkMode = useDarkMode();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARKEST : Color.BACKGROUND_LIGHT,
            minHeight: '100%',
            padding: 16
        },
        text: {
            color: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
            fontSize: 18,
            lineHeight: 20,
            paddingVertical: 8
        }
    });

    return (
        <View style={styles.background}>
            <Text style={styles.text}>{translator.get('HOME_TEXT_WELCOME')}</Text>
            <Text style={styles.text}>{translator.get('HOME_TEXT_NAVIGATE')}</Text>
        </View>
    );
};

export default Home;