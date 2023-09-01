import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    // DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { ReactNode } from 'react';
import Route from '@/types/Route';
import useLocalization from '@/hooks/useLocalization';
import useColor from '@/hooks/useColor';

const CustomDrawerContent = (props: DrawerContentComponentProps): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const drawerItems: Route[] = [{
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
        activeBackgroundColor: color.BACKGROUND_HIGH,
        activeTintColor: color.TEXT_HIGH,
        inactiveTintColor: color.TEXT_MEDIUM
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