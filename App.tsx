import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import NavBar from '@/components/layout/NavBar';
import useDarkMode from '@/hooks/useDarkMode';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@/screens/Home';
import { ReactNode } from 'react';
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import useColor from '@/hooks/useColor';
import { ROUTES } from '@/_consts';

const App = (): ReactNode => {
    const isDarkMode = useDarkMode();
    const color = useColor();

    const Drawer = createDrawerNavigator();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            flex: 1
        }
    });

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={color.BACKGROUND_HIGH}
            />
            <NavigationContainer>
                <NavBar />
                <Drawer.Navigator
                    detachInactiveScreens
                    initialRouteName='home'
                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: color.BACKGROUND_MEDIUM
                        },
                        drawerPosition: 'right'
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    {ROUTES.map(route => (
                        <Drawer.Screen key={route.routeKey} name={route.routeKey} component={route.screen} />
                    ))}
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
