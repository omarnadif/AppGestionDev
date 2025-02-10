export const getTokenFromCookie = () => {
  console.log("Vérification des cookies :", document.cookie);

  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      console.log("Token récupéré :", value);
      return value;
    }
  }
  
  console.warn("Aucun token trouvé dans les cookies.");
  return null;
};
