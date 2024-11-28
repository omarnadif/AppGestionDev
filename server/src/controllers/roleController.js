import RoleModel from '../models/roleModel.js';

class RoleController {
    static async getRoles(req, res) {
        try {
            const Roles = await RoleModel.getAllRoles();
            console.log(Roles);
            res.status(200).json(Roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createRole(req, res) {
        try {
            const RoleData = req.body;
            const newRole = await RoleModel.createRole(RoleData);
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default RoleController;
