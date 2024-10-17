import { useContext, useState } from "react";
import { View , StyleSheet, TouchableOpacity} from "react-native"
import { SettingContext } from "../SettingsContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-gesture-handler";
import * as SQLite from 'expo-sqlite';

export default EditNote = ({route, navigation}) => {
    const {isDarkTheme, dynamicStyles} = useContext(SettingContext);
    const {id, title, description} = route.params;

    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    const confirmNote = async () =>{
        const db = await SQLite.openDatabaseAsync('notesDatabase.db');
        await db.runAsync('UPDATE notes SET title = ?, description = ?  WHERE id = ?',[editedTitle, editedDescription, id]);
        navigation.pop();
    };

    return (
        <View style={dynamicStyles.container}>
            <TextInput
                style={[styles.titleInput, dynamicStyles.text]}
                value={editedTitle}
                onChangeText={setEditedTitle}
            />
            <TextInput
                style={[styles.noteInput, dynamicStyles.text]}
                value={editedDescription}
                multiline={true}
                onChangeText={setEditedDescription}
            />
            <View style={styles.Btn}>
                <TouchableOpacity style={styles.cirRed} onPress={() => navigation.pop()}>
                    <Icon name='close' size={32} color={isDarkTheme ? '#000' : '#fff' }/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cirGreen} onPress={() => confirmNote()}>
                    <Icon name='check' size={32} color={isDarkTheme ? '#000' : '#fff' }/>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleInput: {
        alignSelf: 'center',
        width: '90%',
        height: 52,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 8
    },
    noteInput: {
        alignSelf: 'center',
        width: '90%',
        minHeight: 120,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 8
    },
    Btn: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cirRed: {
        width: 52,
        height: 52,
        borderRadius: 50,
        backgroundColor: 'red',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cirGreen: {
        width: 52,
        height: 52,
        borderRadius: 50,
        backgroundColor: 'green',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});