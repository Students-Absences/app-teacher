import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme
} from 'react-native';
import Color from '@/Colors';
import NavBar from '@components/layout/NavBar';

const App = (): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

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
