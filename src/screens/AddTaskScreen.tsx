import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services/api';

export const AddTaskScreen = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleAdd = async () => {
        if (!text.trim()) {
            Alert.alert("Error", "Please enter a task description");
            return;
        }

        setLoading(true);
        try {
            await api.addTask({
                text: text.trim(),
                completed: false,
            });

            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.label}>What do you need to do?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Buy groceries at 5 PM"
                    value={text}
                    onChangeText={setText}
                    autoFocus
                    multiline
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleAdd}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Add Task</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#90CAF9',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
