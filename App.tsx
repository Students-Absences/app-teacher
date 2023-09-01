import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import Color from '@/Colors';
import NavBar from '@/components/layout/NavBar';
import useDarkMode from '@/hooks/useDarkMode';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/screens/Home';
import { ReactNode } from 'react';
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import DrawerItemProps from '@/types/DrawerItemProps';

const App = (): ReactNode => {
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
                    detachInactiveScreens
                    initialRouteName='Home'
                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: isDarkMode ? Color.BACKGROUND_DARKER : Color.BACKGROUND_LIGHTER
                        },
                        drawerPosition: 'right'
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Drawer.Screen name='Home' component={Home} />
                    <Drawer.Screen name='Home2' component={View} />
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
