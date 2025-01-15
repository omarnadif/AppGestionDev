import { joseUtils } from '../utils/joseUtils'
import { supabase } from '../utils/supabaseClient'

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'Token manquant' })
    }

    // Vérifier le token avec JOSE
    const decoded = await joseUtils.verifyToken(token)

    // Vérifier si l'utilisateur existe toujours dans Supabase
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user || user.id !== decoded.userId) {
      return res.status(401).json({ error: 'Session invalide' })
    }

    req.user = user
    req.decodedToken = decoded
    next()
  } catch (error) {
    return res.status(401).json({ 
      error: 'Erreur d\'authentification',
      details: error.message 
    })
  }
}