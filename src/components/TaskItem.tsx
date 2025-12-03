import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../services/api';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => onToggle(task.id, !task.completed)}
            >
                {task.completed ? (
                    <Ionicons name="checkbox" size={24} color="#4CAF50" />
                ) : (
                    <Ionicons name="square-outline" size={24} color="#757575" />
                )}
            </TouchableOpacity>

            <Text style={[styles.text, task.completed && styles.completedText]}>
                {task.text}
            </Text>

            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        marginRight: 12,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#9E9E9E',
    },
    deleteButton: {
        padding: 4,
    },
});
