import { ROUTES } from '@/Consts';
import Link from '@/buttons/Link';
import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import Route from '@/types/Route';
import { ReactNode } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const Home = (): ReactNode => {
    const color = useColor();
    const translator = useLocalization();

    const styles = StyleSheet.create({
        background: {
            backgroundColor: color.BACKGROUND_LOW,
            minHeight: '100%',
            paddingHorizontal: 16,
            paddingVertical: 64
        },
        text: {
            color: color.TEXT_HIGH,
            fontSize: 18,
            lineHeight: 20,
            paddingVertical: 8
        },
        buttonsContainer: {
            alignItems: 'center',
            flex: 1,
            gap: 16,
            justifyContent: 'center'
        },
        button: {
            alignItems: 'center',
            backgroundColor: color.BACKGROUND_MEDIUM,
            borderRadius: 100,
            justifyContent: 'center',
            paddingHorizontal: 32,
            paddingVertical: 8,
            minWidth: '60%'
        },
        buttonText: {
            color: color.TEXT_MEDIUM,
            fontSize: 24
        }
    });

    return (
        <View style={styles.background}>
            <Text style={styles.text}>{translator.get('HOME_TEXT_WELCOME')}</Text>
            <Text style={styles.text}>{translator.get('HOME_TEXT_NAVIGATE')}</Text>
            <View style={styles.buttonsContainer}>
                {ROUTES.slice(1).map((button: Route) => (
                    <Link
                        key={button.routeKey}
                        routeKey={button.routeKey}
                        labelKey={button.labelKey}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            {translator.get(button.labelKey)}
                        </Text>
                    </Link>
                ))}
            </View>
        </View>
    );
};

export default Home;