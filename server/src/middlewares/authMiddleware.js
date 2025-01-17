import { joseUtils } from '../utils/jwt.js'
import { supabase } from '../utils/supabaseClient.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Accès non autorisé - Token manquant' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await joseUtils.verifyToken(token);
    console.log('Token décodé :', decoded);

    // Vérifiez l'utilisateur dans la table `t_user`
    const { data: user, error } = await supabase
      .from('t_user')
      .select('id, email, firstname, lastname') // Supprimez `role`
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      console.log('Erreur Supabase ou utilisateur introuvable :', error);
      return res.status(401).json({ error: 'Accès non autorisé - Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Erreur lors de la vérification du token :', error);
    return res.status(401).json({ error: 'Accès non autorisé - Token invalide' });
  }
};


