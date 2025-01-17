import * as jose from 'jose'

// Générer une clé secrète pour JOSE
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)

export const joseUtils = {
  // Générer un token JWT
  async generateToken(payload) {
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .setIssuer('your-app')
      .sign(secretKey)
    
    return jwt
  },

  // Vérifier un token JWT
  async verifyToken(token) {
    try {
      const { payload } = await jose.jwtVerify(token, secretKey, {
        issuer: 'your-app',
      })
      return payload
    } catch (error) {
      throw new Error('Token invalide')
    }
  },

  // Décoder un token sans vérification (utile pour debug)
  async decodeToken(token) {
    return jose.decodeJwt(token)
  }
}