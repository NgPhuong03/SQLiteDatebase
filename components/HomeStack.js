import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddNote from '../screens/AddNote';
import EditNote from '../screens/EditNote';
import { useContext } from 'react';
import { SettingContext } from '../SettingsContext';

const Stack = createStackNavigator();

export default HomeStack = () => {
    const {isDarkTheme} = useContext(SettingContext);

    return (
        <Stack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: isDarkTheme ? '#333': '#fff',
            },
            headerTintColor: isDarkTheme ? '#fff': '#000'
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='AddNote' component={AddNote}/>
            <Stack.Screen name='EditNote' component={EditNote}/>
        </Stack.Navigator>
    )
}