import supabase from "../db/connect.js";

class ProjectModel {
    static async getAllProject() {
        const { data, error } = await supabase.from("t_project").select("*");
        if (error) throw new Error(error.message);
        return data;
    }

    static async createProject(projectData) {
        const { data, error } = await supabase.from("t_project").insert([projectData]);
        if (error) throw new Error(error.message);
        return data;
    }

    static async getProjectById(projectId) {
        const { data, error } = await supabase.from("t_project").select("*").eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteProject(projectId) {
        const { data, error } = await supabase.from("t_project").delete().eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }

    static async updateProject(projectId, projectData) {
        const { data, error } = await supabase.from("t_project").update(projectData).eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }
}

export default ProjectModel;