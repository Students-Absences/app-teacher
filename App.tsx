import {
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import NavBar from '@/components/layout/NavBar';
import useDarkMode from '@/data/hooks/useDarkMode';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ReactNode, useCallback, useEffect } from 'react';
import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import useColor from '@/data/hooks/useColor';
import { ROUTES } from '@/consts';
import { initializeDb } from '@/data/database/db-service';

const App = (): ReactNode => {
    const isDarkMode = useDarkMode();
    const color = useColor();

    const initializeDbCallback = useCallback(initializeDb, []);
    useEffect(() => {
        initializeDbCallback();
    }, [initializeDbCallback]);

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
