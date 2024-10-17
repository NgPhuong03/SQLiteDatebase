import { useCallback, useContext, useEffect, useState} from "react"
import { View , StyleSheet, Text, FlatList} from "react-native"
import { SettingContext } from "../SettingsContext"
import Icon from 'react-native-vector-icons/FontAwesome';
import Note from "../components/Note";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from 'expo-sqlite';
import { SafeAreaView } from "react-native";
import { useIsFocused } from '@react-navigation/native';


export default HomeScreen = ({navigation}) => {
    const { isDarkTheme, dynamicStyles } = useContext(SettingContext);
    const [notes, setNotes] = useState([])
    const isFocused = useIsFocused();

    const fetchNotes = useCallback(  async () => {
        try { 
            const db = await SQLite.openDatabaseAsync('notesDatabase.db');
            const result = await db.getAllAsync(`SELECT * FROM notes;`);

            var temp = [];
            for (const row of result) {
            temp.push(row);
            }
            setNotes(temp);
        } catch (error) {
            console.error("Error initializing database:", error);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            fetchNotes();
        }
    }, [isFocused, fetchNotes]);

    
      const ItemView = ({item}) => {
        return (
            <View style={{justifyContent:'center', alignItems:'center', marginBottom: 8}}>
                <Note id={item.id} title={item.title} description={item.description} navigation={navigation} fetchNotes={fetchNotes}/>
            </View>
        );
      };
    return (
        <SafeAreaView style={dynamicStyles.container}>

            {/* Header Note App */}
            <View style={styles.header}>
                <Text style={dynamicStyles.headerTitle}>Note App</Text>
            </View>

            {/* All note component */}
            <View style={styles.allnote}>
                <Text style={dynamicStyles.allnoteText}>All notes</Text>

                <TouchableOpacity style={dynamicStyles.circle} onPress={() => navigation.navigate('AddNote')}>
                    <Icon name="plus" size={24} color={ isDarkTheme ? '#000' : '#fff'}/>
                </TouchableOpacity>
            </View>

            {/* Note */}
            <View style={styles.header}>
                <FlatList
                    data={notes}
                    renderItem={ItemView}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    allnote: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    
})
