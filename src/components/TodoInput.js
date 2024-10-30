import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/slices/todoSlice';

const TodoInput = () => {
    const [currentValue, setCurrentValue] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (currentValue !== '') {
            dispatch(addTodo(currentValue));
            setCurrentValue('');
    }};

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.inputAndMicrophone}>
                <TextInput
                    value={currentValue} 
                    multiline
                    placeholder='할 일을 작성해주세요.'
                    placeholderTextColor='#767676'
                    style={styles.input}
                    onChangeText={setCurrentValue}
                    onSubmitEditing={handleSubmit}
                    blurOnSubmit={true}
                />
            </View>
            <Pressable style={styles.sendButton} onPress={handleSubmit}>
                <FontAwesome name='send' size={18} color='white' />
            </Pressable>
        </View>
        </View>
    )
};

export default TodoInput;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 1,
        paddingBottom: 30
    },
    innerContainer: {
        paddingHOrizontal: 10,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    inputAndMicrophone:{
        flexDirection: 'row',        
        marginRight: 10,
        paddingVertical: 10,
        flex: 3,
        borderRadius: 30,
    },
    input: {
        paddingLeft: 10,
        maxHeight: 100,
        alignSelf: 'center',
        backgroundColor: '#eeeeee',
        flex: 3,
        borderRadius: 20,
        height: 40,
        fontSize: 16,   
        paddingTop: 10,     
    },
    emoticonButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    sendButton: {
        backgroundColor: '#ef4141',
        borderRadius: 50,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
})