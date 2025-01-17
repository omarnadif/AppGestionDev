import supabase from '../db/connect.js';

class TaskModel {
    /**
     * Retrieves all tasks from the `t_task` table.
     */
    static async getAllTasks() {
        const { data, error } = await supabase.from('t_task').select('*');
        if (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Database query error.');
        }
        return data;
    }

    /**
     * Inserts a new task into the `t_task` table.
     * @param {Object} taskData - Task data to insert.
     */
    static async createTask(taskData) {
        const { data, error } = await supabase
            .from('t_task')
            .insert([taskData])
            .select('*');  // Ajout de cette ligne pour retourner la tâche créée
    
        if (error) {
            console.error('Error creating task:', error);
            throw new Error('Database insert error.');
        }
    
        return data[0];  // Retourne la première (et seule) tâche créée
    }
}

export default TaskModel;
