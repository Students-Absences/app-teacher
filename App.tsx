import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme
} from 'react-native';
import Colors from '@/Colors';
import NavBar from '@components/layout/NavBar';

const App = (): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const styles = StyleSheet.create({
        background: {
            backgroundColor: isDarkMode ? Colors.background_darkest : Colors.background_light,
            flex: 1
        }
    });

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? Colors.background_dark : Colors.background_lightest}
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
