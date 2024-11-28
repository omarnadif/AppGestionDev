import supabase from '../db/connect.js'; // Importer l'instance de Supabase

class TaskModel {
    static async getAllTasks() {
        const { data, error } = await supabase.from('Tasks').select('*'); // Utiliser supabase pour interagir avec la table
        if (error) throw new Error(error.message);
        return data;
    }

    static async createTask(taskData) {
        const { data, error } = await supabase.from('Tasks').insert([taskData]); // Utiliser supabase pour insérer des données
        if (error) throw new Error(error.message);
        return data;
    }
}

export default TaskModel;

