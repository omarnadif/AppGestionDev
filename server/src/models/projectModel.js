import supabase from "../db/connect.js";

class ProjectModel {
    static async getAllProjects() {
        const { data, error } = await supabase.from("Projects").select("*");
        if (error) throw new Error(error.message);
        return data;
    }

    static async createProject(projectData) {
        const { data, error } = await supabase.from("Projects").insert([projectData]);
        if (error) throw new Error(error.message);
        return data;
    }

    static async getProjectById(projectId) {
        const { data, error } = await supabase.from("Projects").select("*").eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteProject(projectId) {
        const { data, error } = await supabase.from("Projects").delete().eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }

    static async updateProject(projectId, projectData) {
        const { data, error } = await supabase.from("Projects").update(projectData).eq("id", projectId);
        if (error) throw new Error(error.message);
        return data;
    }
}

export default ProjectModel;