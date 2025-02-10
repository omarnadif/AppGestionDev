import UserModel from '../models/userModel.js';
import { supabase } from '../utils/supabaseClient.js';
import { authService } from '../services/authService.js';

class AuthController {
    static async signup(req, res) {
        try {
            const { email, password, firstname, lastname, phone } = req.body;
            console.log(req.body);

            if (!email || !password) {
                return res.status(400).json({ error: 'Email et mot de passe requis' });
            }

            const user = await authService.signUp(email, password, firstname, lastname, phone);

            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Email et mot de passe requis' });
            }

            // Appel du service d'authentification pour obtenir le token et d'autres infos
            const result = await authService.login(email, password);

            // Définir les options du cookie
            const cookieOptions = {
                httpOnly: false, // 🔥 Désactiver httpOnly pour permettre au front de lire le cookie
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000,
            };
            
            res.cookie('token', result.token, cookieOptions);

            // Vérification du cookie envoyé
            console.log('Set-Cookie:', res.getHeaders()['set-cookie']);

            return res.status(200).json({ user: result.user });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            res.cookie('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                expires: new Date(0),
            });

            return res.status(200).json({ message: 'Déconnexion réussie' });
        } catch (error) {
            return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        }
    }
}

export default AuthController;
