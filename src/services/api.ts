import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Task {
    id: string; // Keep as string for frontend consistency, even if backend sends number
    text: string;
    completed: boolean;
    createdAt: string;
}

export const api = {
    getTasks: async (): Promise<Task[]> => {
        if (!API_URL) return [];
        try {
            const response = await axios.get(`${API_URL}/tasks`);
            return response.data.map((task: any) => ({
                id: task.id.toString(),
                text: task.text,
                completed: task.completed,
                createdAt: task.created_at,
            }));
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    },

    addTask: async (task: Omit<Task, 'id' | 'createdAt'>) => {
        if (!API_URL) return;
        try {
            await axios.post(`${API_URL}/tasks`, {
                text: task.text,
                completed: task.completed
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    },

    toggleTask: async (id: string, completed: boolean) => {
        if (!API_URL) return;
        try {
            await axios.put(`${API_URL}/tasks/${id}`, {
                completed
            });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    },

    deleteTask: async (id: string) => {
        if (!API_URL) return;
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
};
