import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import { DrawerActions } from '@react-navigation/native';
import { ReactNode } from 'react';
import DrawerItemProps from '@/types/DrawerItemProps';

const CustomDrawerContent = (props: DrawerContentComponentProps): ReactNode => {
    const isDarkMode = useDarkMode();

    const drawerItems: DrawerItemProps[] = [{
        key: 'Home',
        label: 'Home'
    }, {
        key: 'Home2',
        label: 'Home2'
    }];

    /**
     * Navigates to the screen with the given key.
     * 
     * @param key The key of the screen to navigate to.
     */
    const goTo = (key: string): void => {
        props.navigation.navigate(key);

        // Close drawer
        props.navigation.dispatch(DrawerActions.closeDrawer());
    };

    const focusedRouteIndex = props.navigation.getState().index;
    const drawerItemProps = {
        activeBackgroundColor: isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST,
        activeTintColor: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
        inactiveTintColor: isDarkMode ? Color.TEXT_DARK_MEDIUM : Color.TEXT_LIGHT_MEDIUM
    }

    return (
        <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
            {drawerItems.map((item, index) => (
                <DrawerItem
                    key={item.key}
                    label={item.label}
                    onPress={() => goTo(item.key)}
                    {...drawerItemProps}
                    focused={focusedRouteIndex === index}
                />))}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;