import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    // DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { ReactNode } from 'react';
import useLocalization from '@/hooks/useLocalization';
import useColor from '@/hooks/useColor';
import { ROUTES } from '@/Consts';

const CustomDrawerContent = (props: DrawerContentComponentProps): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    /**
     * Navigates to the screen with the given routeKey.
     * 
     * @param routeKey The key of the screen to navigate to.
     */
    const goTo = (routeKey: string): void => {
        props.navigation.navigate(routeKey);

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
            {ROUTES.map((item, index) => (
                <DrawerItem
                    key={item.routeKey}
                    label={translator.getCapitalized(item.labelKey)}
                    onPress={() => goTo(item.routeKey)}
                    {...drawerItemProps}
                    focused={focusedRouteIndex === index}
                    style={{
                        borderRadius: 16,
                        marginHorizontal: 16,
                        marginVertical: 12,
                        paddingHorizontal: 8
                    }}
                />))}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;