import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import { SettingContext } from '../SettingsContext';

export default Setting = () => {
    const {isDarkTheme, toggleDarkTheme, textSize, setTextSize} = useContext(SettingContext);
    const [dynamicStyles, setDynamicStyles] = useState({});

    useEffect(() => {
        setDynamicStyles(StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDarkTheme ? '#000' : '#eee'
            },
            text: {
                color: isDarkTheme ? 'white' : 'black',
                fontSize: textSize
            }
        }))
    },[textSize, isDarkTheme]);
    

    return (
        <View style={dynamicStyles.container}>
            <View style={styles.settingContainer}>
                <Text style={dynamicStyles.text}>Dark Mode</Text>
                <Switch 
                    value={isDarkTheme}
                    onChange={() => toggleDarkTheme()}
                    />
            </View>

            <View style={styles.settingContainer}>
                <Text style={dynamicStyles.text}>Font Size</Text>
                <Text style={dynamicStyles.text}>{textSize}</Text>
            </View>

            <Slider
                style={styles.sliderContainer}
                value={textSize}
                onValueChange={(val) => setTextSize(val)}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#3498db"
                maximumTrackTintColor="#f4f4f4"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    settingContainer: {
        margin: 4,
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    sliderContainer: {
        width: 300,
        height: 40
    }
});


