import UserModel from '../models/userModel.js';

class UserController {
    /**
     * Récupère l'utilisateur actuel connecté
     * @param {Object} req - La requête HTTP
     * @param {Object} res - La réponse HTTP
     */
    static async getCurrentUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await UserModel.getUserById(userId);

            const userData = user[0] || user;

            if (!userData) {
                return res.status(404).json({ error: 'User not found' });
            }

            const {
                password_hash,
                created_at,
                updated_at,
                ...userWithoutPassword
            } = userData;

            res.status(200).json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Met à jour les informations de l'utilisateur actuel
     * @param {Object} req - La requête HTTP
     * @param {Object} res - La réponse HTTP
     */
    static async updateCurrentUser(req, res) {
        try {
            const userId = req.user.id;
            const userData = req.body;
            console.log('ID Utilisateur:', userId);
            console.log('Données reçues:', userData);
            const { email, id, ...updateData } = userData;
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    message: 'Aucune donnée à mettre à jour'
                });
            }
            console.log('Données à mettre à jour:', updateData);
            const updateResult = await UserModel.updateUser(userId, updateData);
            console.log('Résultat de la mise à jour:', updateResult);
            const updatedUser = await UserModel.getUserById(userId);
            console.log('Utilisateur mis à jour:', updatedUser);
            const { password, ...userResponse } = updatedUser;
            res.status(200).json(userResponse);
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            res.status(500).json({
                message: 'Erreur lors de la mise à jour du profil',
                error: error.message
            });
        }
    }

    /**
     * Récupère un utilisateur par son ID
     * @param {Object} req - La requête HTTP
     * @param {Object} res - La réponse HTTP
     */
    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.getUserById(userId);

            // Gère la possibilité d'une réponse imbriquée
            const userData = user[0] || user;

            const { password, ...userResponse } = userData;
            res.status(200).json(userResponse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Supprime un utilisateur
     * @param {Object} req - La requête HTTP
     * @param {Object} res - La réponse HTTP
     */
    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await UserModel.deleteUser(userId);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UserController;