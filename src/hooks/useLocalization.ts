import { Platform, NativeModules } from 'react-native';

const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] : //iOS 13
    NativeModules.I18nManager.localeIdentifier;

const useLocalization = () => {
    const locales = deviceLanguage === 'el_GR' ?
        require('@/resources/locales/el_GR.json') :
        require('@/resources/locales/en_US.json');

    function get(key: string) {
        return locales[key];
    }

    return {locales, get};
};

export default useLocalization;