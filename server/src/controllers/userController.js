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
    static async getUsers(req, res) {
        try {
            const users = await UserModel.getAllUser();
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

    static async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

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
    static async getMe(req, res) {
        try {
            const userId = req.user.id; 
            const user = await UserModel.getUserById(userId); 
    
            const userData = user[0] || user;
    
            if (!userData) {
                return res.status(404).json({ error: 'User not found' });
            }

            const { password_hash, ...userWithoutPassword } = userData;
    
            res.status(200).json(userWithoutPassword);
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
