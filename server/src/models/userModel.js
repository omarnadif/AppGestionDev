import supabase from '../db/connect.js'; // Importer l'instance de Supabase

class UserModel {
    static async getAllUsers() {
        const { data, error } = await supabase.from('Users').select('*'); // Utiliser supabase pour interagir avec la table
        if (error) throw new Error(error.message);
        return data;
    }

    static async createUser(userData) {
        const { data, error } = await supabase.from('Users').insert([userData]); // Utiliser supabase pour insérer des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async getUserById(userId) {
        const { data, error } = await supabase.from('Users').select('*').eq('id', userId); // Utiliser supabase pour sélectionner des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteUser(userId) {
        const { data, error } = await supabase.from('Users').delete().eq('id', userId); // Utiliser supabase pour supprimer des données
        if (error) throw new Error(error.message);
        return data;
    }

    static async updateUser(userId, userData) {
        const { data, error } = await supabase.from('Users').update(userData).eq('id', userId); // Utiliser supabase pour mettre à jour des données
        if (error) throw new Error(error.message);
        return data;
    }
}

export default UserModel;

