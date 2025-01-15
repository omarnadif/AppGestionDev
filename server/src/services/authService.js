// services/authService.js
import { supabase } from '../utils/supabaseClient'
import { joseUtils } from '../utils/joseUtils'
import { UserModel } from '../models/userModel'
export const authService = {
  // Inscription
  async signUp(email, password) {
    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (signUpError) throw signUpError

      // Créer le payload du token
      const payload = {
        userId: user.id,
        email: user.email,
        role: 'user'
      }

      // Créer un nouvel utilisateur dans la base de données
      const newUser = await UserModel.createUser(user.id, user.email)

      // Générer le token avec JOSE
      const token = await joseUtils.generateToken(payload)
      
      return {
        user,
        token,
        newUser
      }
    } catch (error) {
      throw error
    }
  },

  // Connexion
  async signIn(email, password) {
    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (signInError) throw signInError

      // Créer le payload du token
      const payload = {
        userId: user.id,
        email: user.email,
        role: 'user'
      }

      // Générer le token avec JOSE
      const token = await joseUtils.generateToken(payload)
      
      return {
        user,
        token
      }
    } catch (error) {
      throw error
    }
  },

  // Rafraîchir le token
  async refreshToken(oldToken) {
    try {
      // Vérifier l'ancien token
      const decoded = await joseUtils.verifyToken(oldToken)
      
      // Créer un nouveau token avec les mêmes données
      return await joseUtils.generateToken({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      })
    } catch (error) {
      throw new Error('Impossible de rafraîchir le token')
    }
  }
}