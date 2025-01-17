const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    const token = cookies.find(cookie => cookie.startsWith('token='));
    return token ? token.split('=')[1] : null;
  };

export { getTokenFromCookie };