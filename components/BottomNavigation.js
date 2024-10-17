import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SettingScreen from '../screens/SettingScreen';
import { useContext } from 'react';
import { SettingContext } from '../SettingsContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';


const Tab = createBottomTabNavigator();

export default BottomNavigation = () => {
    const {isDarkTheme, textSize} = useContext(SettingContext);

    return( 
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: isDarkTheme ? '#333' : '#fff'
            },
            headerTintColor: isDarkTheme ? '#fff' : '#000',
            tabBarActiveBackgroundColor: isDarkTheme ? '#333' : '#fff',
            tabBarInactiveBackgroundColor: isDarkTheme ? '#333' : '#fff',
            tabBarLabelStyle: {fontSize: 16, fontFamily: 'Roboto'} 
        }}>
            <Tab.Screen name='Home' component={HomeStack} options={{
                headerShown: false,
                tabBarIcon:({size, color}) => <Icon name='home' size={size} color={color}/>
            }}/>
            <Tab.Screen name='Settings' component={SettingScreen} options={{
                tabBarIcon:({size, color}) => <Icon name='gear' size={size} color={color}/>
            }}/>
        </Tab.Navigator>
    )
}