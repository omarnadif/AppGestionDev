const getTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    console.log('cookies:', cookies);
    const token = cookies.find(cookie => cookie.startsWith('token='));
    console.log('token:', token);
    return token ? token.split('=')[1] : null;
  };

export { getTokenFromCookie };