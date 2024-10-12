import listItem from '@/data/types/list-item';
import { Platform, NativeModules } from 'react-native';

const deviceLanguage = Platform.OS === 'ios' ?
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] : //iOS 13
    NativeModules.I18nManager.localeIdentifier;

/**
 * A hook that detects the device's preferred language and returns the selected localized string.
 * 
 * @example
 * const translator = useLocalization();
 * console.log(translator.get('hello'));
 * // "Γεια σου" if the device's preferred language is Greek
 * // "Hello" if it's English
 * 
 * @returns An object containing the locales object and the get, getNoAccents and getCapitalized functions.
 */
const useLocalization = () => {
    const locales = deviceLanguage === 'el_GR' ?
        require('@/resources/locales/el_GR.json') :
        require('@/resources/locales/en_US.json');

    /**
     * Gets the string corresponding to the key from the locales object.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key
     */
    const get = (key: string): string => {
        if (!locales[key])
            throw new Error(`INVALID KEY: ${key}`);

        return locales[key];
    };

    /**
     * Gets the label of the item, depending on the device's preferred language.
     * 
     * @param item The item to get the label of
     * @returns The label of the item, depending on the device's preferred language
     */
    const getItem = (item: listItem): string => {
        return deviceLanguage === 'el_GR' ?
            item.label :
            item.labelEn;
    }

    /**
     * Gets the string corresponding to the key from the locales object, without accents.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, without accents
     */
    const getNoAccents = (key: string): string => {
        return get(key).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    /**
     * Gets the string corresponding to the key from the locales object, in uppercase.
     * 
     * @param key The key of the string to get
     * @returns The string corresponding to the key, in uppercase
     */
    const getCapitalized = (key: string): string => {
        return getNoAccents(key).toUpperCase();
    };

    return {
        get,
        getItem,
        getNoAccents,
        getCapitalized
    };
};

export default useLocalization;