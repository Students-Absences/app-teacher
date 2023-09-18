import useDarkMode from '@/hooks/useDarkMode';
import Color from '@/colors';

const useColor = () => {
    const isDarkMode = useDarkMode();

    return {
        BACKGROUND_LOW: isDarkMode ? Color.BACKGROUND_DARKEST : Color.BACKGROUND_LIGHT,
        BACKGROUND_MEDIUM: isDarkMode ? Color.BACKGROUND_DARKER : Color.BACKGROUND_LIGHTER,
        BACKGROUND_HIGH: isDarkMode ? Color.BACKGROUND_DARK : Color.BACKGROUND_LIGHTEST,
        BACKGROUND_ABSENT: isDarkMode ? Color.BACKGROUND_ABSENT_DARK : Color.BACKGROUND_ABSENT,

        TEXT_LOW: isDarkMode ? Color.TEXT_DARK_LOW : Color.TEXT_LIGHT_LOW,
        TEXT_MEDIUM: isDarkMode ? Color.TEXT_DARK_MEDIUM : Color.TEXT_LIGHT_MEDIUM,
        TEXT_HIGH: isDarkMode ? Color.TEXT_DARK_HIGH : Color.TEXT_LIGHT_HIGH,
        TEXT_WARNING: isDarkMode ? Color.TEXT_DARK_WARNING : Color.TEXT_LIGHT_WARNING,

        PRIMARY: isDarkMode ? Color.PRIMARY_DARK : Color.PRIMARY_LIGHT,
        SECONDARY: isDarkMode ? Color.SECONDARY_DARK : Color.SECONDARY_LIGHT
    }
};

export default useColor;