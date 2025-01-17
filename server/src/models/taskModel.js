import supabase from '../db/connect.js';

class TaskModel {
    static async getAllTasks() {
        const { data, error } = await supabase.from('t_task').select('*');
        if (error) {
            console.error('Error fetching tasks:', error);
            throw new Error('Database query error.');
        }
        return data;
    }

    static async getTasksByProjectId(projectId) {
        const { data, error } = await supabase
            .from("t_task")
            .select("*")
            .eq("project_id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }

    static async createTask(taskData) {
        const { data, error } = await supabase
            .from('t_task')
            .insert([taskData])
            .select('*');

        if (error) {
            console.error('Error creating task:', error);
            throw new Error('Database insert error.');
        }

        return data[0];
    }

    // Nouvelle méthode pour la mise à jour
    static async updateTask(taskId, updateData) {
        const { data, error } = await supabase
            .from('t_task')
            .update(updateData)
            .eq('id', taskId)
            .select('*');

        if (error) {
            console.error('Error updating task:', error);
            throw new Error('Database update error.');
        }

        return data[0];
    }

    // Nouvelle méthode pour la suppression
    static async deleteTask(taskId) {
        const { error } = await supabase
            .from('t_task')
            .delete()
            .eq('id', taskId);

        if (error) {
            console.error('Error deleting task:', error);
            throw new Error('Database delete error.');
        }

        return true;
    }
}

export default TaskModel;