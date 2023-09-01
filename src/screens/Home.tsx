import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Home = (props: any): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            minHeight: '100%',
            padding: 16
        },
        text: {
            color: color.TEXT_HIGH,
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