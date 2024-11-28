import supabase from '../db/connect.js'; // Importer l'instance de Supabase

class UserModel {
    static async getAllUser() {
        const { data, error } = await supabase.from('t_user').select('*'); // Utiliser supabase pour interagir avec la table
        if (error) throw new Error(error.message);
        return data;
    }

    static async createUser(userData) {
        const { data, error } = await supabase.from('t_user').insert([userData]); // Utiliser supabase pour insérer des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async getUserById(userId) {
        const { data, error } = await supabase.from('t_user').select('*').eq('id', userId); // Utiliser supabase pour sélectionner des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteUser(userId) {
        const { data, error } = await supabase.from('t_user').delete().eq('id', userId); // Utiliser supabase pour supprimer des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async updateUser(userId, userData) {
        const { data, error } = await supabase.from('t_user').update(userData).eq('id', userId); // Utiliser supabase pour mettre à jour des données
        if (error) throw new Error(error.message);
        return data;
    }
}

export default UserModel;

