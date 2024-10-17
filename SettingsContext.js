import { createContext, useState } from "react";
import { StyleSheet } from "react-native"
const SettingContext = createContext();

const SettingProvider = ({children}) => {
    const [isDarkTheme,setDarkTheme] = useState(false);
    const [textSize,setTextSize] = useState(16);

    const toggleDarkTheme = () => {
        setDarkTheme(!isDarkTheme);
    }

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkTheme? '#000' : '#eee'
        },
        text: {
            color: isDarkTheme ? '#fff' : '#000',
            fontSize: textSize
        },
        headerTitle: {
            color: isDarkTheme ? '#0099FF' : '#FF6633',
            fontSize: textSize + 8,
            fontWeight: 'bold'
        },
        circle: {
            width: 56,
            height: 56,
            borderRadius: 50,
            backgroundColor: isDarkTheme ? '#0099FF' : '#FF6633',
            alignItems: 'center',
            justifyContent: 'center'
        },
        allnoteText: {
            color: isDarkTheme ? '#fff' : '#000',
            fontSize: textSize + 4,
            fontWeight: 'bold'
        }
    })


    return (
        <SettingContext.Provider value={{isDarkTheme, toggleDarkTheme, textSize , setTextSize, dynamicStyles}}>
            {children}
        </SettingContext.Provider>
    )
}

export {SettingContext, SettingProvider};