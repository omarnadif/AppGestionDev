import supabase from '../db/connect.js'; // Importer l'instance de Supabase

class RoleModel {
    static async getAllRoles() {
        const { data, error } = await supabase.from('Role').select('*'); // Utiliser supabase pour interagir avec la table
        if (error) throw new Error(error.message);
        return data;
    }

    static async createRole(RoleData) {
        const { data, error } = await supabase.from('Role').insert([RoleData]); // Utiliser supabase pour insérer des données
        if (error) throw new Error(error.message);
        return data;
    }
}

export default RoleModel;

