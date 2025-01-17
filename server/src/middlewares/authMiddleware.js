import { joseUtils } from '../utils/joseUtils'
import { supabase } from '../utils/supabaseClient'

export const authMiddleware = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Accès non autorisé - Token manquant' 
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = await joseUtils.verifyToken(token)

    const { data: user, error } = await supabase
      .from('client')
      .select('id, email, role')
      .eq('id', decoded.userId)
      .single()

    if (error || !user) {
      return res.status(401).json({ 
        error: 'Accès non autorisé - Utilisateur non trouvé' 
      })
    }

    req.user = user
    
    next()
  } catch (error) {
    return res.status(401).json({ 
      error: 'Accès non autorisé - Token invalide' 
    })
  }
}
