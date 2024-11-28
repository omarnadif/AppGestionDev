// services/supabaseService.js
import supabase from '../db/connect.js';

// Service pour l'inscription de l'utilisateur
export const signUpUser = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return session;
};

// Service pour la connexion de l'utilisateur
export const signInUser = async (email, password) => {
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return session;
};

// Récupérer les informations d'un utilisateur
export const getUserInfo = async (accessToken) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', accessToken.userId);

  if (error) throw new Error(error.message);
  return data;
};
