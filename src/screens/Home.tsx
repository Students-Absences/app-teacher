import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Home = (props: any): ReactNode => {
    const isDarkMode = useDarkMode();

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
            <Text style={styles.text}>Καλώς ήρθατε στην υπηρεσία διαχείρισης απουσιών του σχολείου μας.</Text>
            <Text style={styles.text}>Για να πλοηγηθείτε στην εφαρμογή επιλέξτε κάποιον από τους παρακάτω διαθέσιμους συνδέσμους ή χρησιμοποιείστε το μενού.</Text>
        </View>
    );
};

export default Home;