import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    // DrawerItemList
} from '@react-navigation/drawer';
import Color from '@/Colors';
import useDarkMode from '@/hooks/useDarkMode';
import { DrawerActions } from '@react-navigation/native';
import { ReactNode } from 'react';
import DrawerItemProps from '@/types/DrawerItemProps';
import useLocalization from '@/hooks/useLocalization';

const CustomDrawerContent = (props: DrawerContentComponentProps): ReactNode => {
    const isDarkMode = useDarkMode();
    const translator = useLocalization();

    const drawerItems: DrawerItemProps[] = [{
        key: 'home',
        labelKey:'LABEL_HOME'
    }, {
        key: 'absences',
        labelKey:'LABEL_ABSENCES'
    }, {
        key: 'sync',
        labelKey:'LABEL_SYNC'
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
                    label={translator.getCapitalized(item.labelKey)}
                    onPress={() => goTo(item.key)}
                    {...drawerItemProps}
                    focused={focusedRouteIndex === index}
                />))}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;