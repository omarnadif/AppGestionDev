import UserModel from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({});
const upload = multer({ storage });

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

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            await UserModel.updateUser(userId, userData);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async uploadAvatar(req, res) {
        try {
            // Vérifiez si l'utilisateur est authentifié (req.user doit exister via authMiddleware)
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: No user ID found in token' });
            }

            // Vérifiez si un fichier est fourni
            if (!req.file) {
                return res.status(400).json({ error: 'No file provided' });
            }

            // Uploader l'image sur Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'user_avatars', // Organisation dans Cloudinary
            });

            // Mettre à jour l'URL de l'avatar dans la base de données
            const avatarUrl = result.secure_url;
            await UserModel.updateUser(userId, { avatar: avatarUrl });

            // Réponse de succès
            res.status(200).json({ message: 'Avatar updated successfully', avatarUrl });
        } catch (error) {
            // Gestion des erreurs
            res.status(500).json({ error: error.message });
        }
    }

}


export const uploadMiddleware = upload.single('avatar');
export default UserController;