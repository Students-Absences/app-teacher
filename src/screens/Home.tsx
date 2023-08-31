import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const Home = (props: any): JSX.Element => {
    const isDarkMode = useDarkMode();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARKEST : Color.BACKGROUND_LIGHT,
            display: 'flex',
            flexDirection: 'row',
            padding: 16,
            minHeight: '100%'
        }
    });

    return (
        <View style={styles.background}>
            <Text>This is home view</Text>
        </View>
    );
};

export default Home;