import { NavigationContainer } from '@react-navigation/native';
import { SettingProvider } from './SettingsContext';
import BottomNavigation from './components/BottomNavigation';
import { StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect} from "react"


export default function App() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await SQLite.openDatabaseAsync('notesDatabase.db');
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT);
        `);
      } catch (error) {
        console.error("Error: Khong mo duoc database o App.js", error);
      }
    };
    initializeDatabase();
  })

  return (
    <SettingProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={'#999'}/>
        <BottomNavigation/>
      </NavigationContainer>
    </SettingProvider>
    
  );
}

