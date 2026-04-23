import jwt from 'jsonwebtoken';

const secret = process.env['JWT_SECRET'];

if (!secret) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export function signJwt(payload: object): string {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '7d' });
}

export function verifyJwt(token: string): jwt.JwtPayload {
  return jwt.verify(token, secret) as jwt.JwtPayload;
}
