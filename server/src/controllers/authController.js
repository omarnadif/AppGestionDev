import UserModel from '../models/userModel.js'
import { supabase } from '../utils/supabaseClient.js'
import { authService } from '../services/authService.js'

class AuthController {
    static async signup(req, res) {
        try {
        const {email, password, firstname, lastname, phone } = req.body
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' })
        }
    
        const user = await authService.signUp(email, password, firstname, lastname, phone)
    
        return res.status(201).json(user)
        } catch (error) {
        return res.status(400).json({ error: error.message })
        }
    }
    
    static async login(req, res) {
        try {
        const { email, password } = req.body
    
        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' })
        }
    
        const user = await UserModel.findByEmail(email)
    
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    
        const isPasswordValid = await user.comparePassword(password)
    
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' })
        }
    
        const token = await authService.login(user)
    
        return res.status(200).json({ token })
        } catch (error) {
        return res.status(400).json({ error: error.message })
        }
    }
    
    static async logout(req, res) {
        try {
        const token = req.headers.authorization?.split(' ')[1]
    
        if (!token) {
            return res.status(401).json
        }

        await authService.logout(token)

        return res.status(200).json({ message: 'Déconnexion réussie' })
        }
        catch (error) {
        return res.status(400).json({ error: error.message })
        }
    }
}

export default AuthController;   