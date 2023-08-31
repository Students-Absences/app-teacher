import {
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import Color from '@/Colors';
import NavBar from '@/components/layout/NavBar';
import useDarkMode from '@/hooks/useDarkMode';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/screens/Home';
import React from 'react';

const App = (): JSX.Element => {
    const isDarkMode = useDarkMode();

    const Drawer = createDrawerNavigator();

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
            <NavigationContainer>
                <NavBar />
                <Drawer.Navigator
                    initialRouteName='Home'
                    {...{ screenOptions: { headerShown: false }}}
                >
                    <Drawer.Screen name='Home' component={Home} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
