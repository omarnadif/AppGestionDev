// services/authService.js
import supabase from '../db/connect.js'
import { joseUtils } from '../utils/jwt.js'
import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
export const authService = {
  // Inscription
  async signUp(email, password, firstname, lastname, phone) {
    try {
      // Vérifier si l'email existe déjà
      const { data: existingUser } = await supabase
        .from('t_user')
        .select('email')
        .eq('email', email)
        .single()

      if (existingUser) {
        throw new Error('Cet email est déjà utilisé')
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10)

      // Créer l'utilisateur dans votre table client
      const { data: newUser, error } = await supabase
        .from('t_user')
        .insert([
          {
            email,
            password_hash: hashedPassword,
            firstname,
            lastname,
            phone
          }
        ])
        .select()
        .single()

      if (error) throw error

      // Générer le JWT
      const token = await joseUtils.generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: 'client'
      })

      // On ne renvoie pas le hash du mot de passe
      const { password: _, ...userWithoutPassword } = newUser

      return {
        user: userWithoutPassword,
        token
      }
    } catch (error) {
      throw error
    }
  },

  async login(email, password) {
    try {
      // Vérifier si l'utilisateur existe
      const { data: user, error } = await supabase
        .from('t_user')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !user) {
        throw new Error('Email ou mot de passe incorrect')
      }

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password_hash)
      if (!validPassword) {
        throw new Error('Email ou mot de passe incorrect')
      }

      // Générer le JWT
      const token = await joseUtils.generateToken({
        userId: user.id,
        email: user.email,
      })

      // Ne pas renvoyer le mot de passe hashé
      const { password: _, ...userWithoutPassword } = user

      return {
        user: userWithoutPassword,
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