import useColor from '@/hooks/useColor';
import useLocalization from '@/hooks/useLocalization';
import Route from '@/types/Route';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

    const onPress = (key: string) => {
        navigation.navigate(key);
    };

    const linkButtons: Route[] = [{
        key: 'absences',
        labelKey: 'LABEL_ABSENCES'
    }, {
        key: 'sync',
        labelKey: 'LABEL_SYNC'
    }]

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
                {linkButtons.map((button: Route) => (
                    <Pressable
                        key={button.key}
                        onPress={() => onPress(button.key)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{translator.get(button.labelKey)}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default Home;