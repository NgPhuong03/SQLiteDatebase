import { useContext} from "react";
import { View , StyleSheet, Text} from "react-native"
import { SettingContext } from "../SettingsContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SQLite from 'expo-sqlite';

export default Note = ({id, title, description, navigation, fetchNotes}) => {
    const {isDarkTheme, textSize} = useContext(SettingContext);

    const deleteNote = async () =>{
        const db = await SQLite.openDatabaseAsync('notesDatabase.db');
        await db.runAsync('DELETE FROM notes WHERE id = ?', id);
        fetchNotes()
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 4
        },
        title:  {
            fontWeight: 'bold',
            flexWrap: 'wrap',
            color: isDarkTheme ? '#fff' : '#555',
            fontSize: textSize + 4
        }
        ,text: {
            color: isDarkTheme ? '#fff' : '#777',
            flexWrap: 'wrap',
            fontSize: textSize
        },
        trashIcon: {
            padding: 8,
            marginRight: 4
        },
        content: {
            width: 300,
            padding: 4
        }
    });
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('EditNote', {id: id, title: title, description: description})}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{description}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.trashIcon} onPress={() => deleteNote()}>
                <Icon name="trash" size={36} color={'#555'}/>
            </TouchableOpacity>
            
        </View>
    )
}

