import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet
} from 'react-native';
import Color from '@/Colors';
import NavBar from '@components/layout/NavBar';
import useDarkMode from '@hooks/useDarkMode';

const App = (): JSX.Element => {
    const isDarkMode = useDarkMode();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: isDarkMode ? Color.BACKGROUND_DARKEST : Color.BACKGROUND_LIGHT,
            flex: 1
        }
    });

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST}
            />
            <NavBar />
            <ScrollView contentInsetAdjustmentBehavior='automatic'>
                {/* <Header />
                <View>
                <LearnMoreLinks />
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
