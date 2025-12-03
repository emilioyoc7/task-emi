import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api, Task } from '../services/api';
import { TaskItem } from '../components/TaskItem';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types locally or import from a types file
type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const loadTasks = async () => {
        try {
            const data = await api.getTasks();
            // Sort tasks: pending first, then completed. Within that, maybe by date?
            // For now, just reverse chronological if possible, or just as is.
            // Let's sort by createdAt descending (newest first)
            const sorted = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setTasks(sorted);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadTasks();
    };

    const handleToggle = async (id: string, completed: boolean) => {
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
        await api.toggleTask(id, completed);
        // Optionally reload to ensure sync, but optimistic is better UX
    };

    const handleDelete = async (id: string) => {
        // Optimistic update
        setTasks(prev => prev.filter(t => t.id !== id));
        await api.deleteTask(id);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#2196F3" />
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TaskItem task={item} onToggle={handleToggle} onDelete={handleDelete} />
                    )}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    listContent: {
        padding: 16,
        paddingBottom: 80, // Space for FAB
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#757575',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
