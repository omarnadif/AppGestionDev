import UserModel from '../models/userModel.js';

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            console.log(users);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserModel.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;
