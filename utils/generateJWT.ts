import jwt from 'jsonwebtoken';

export default async function generateJwt(key: string, id: string) {
  const secret = process.env.JWT_SECRET || 'bakebit';
  const token = await jwt.sign(
    {
      key,
      id,
    },
    secret,
    {
      expiresIn: 8640000,
    }
  );

  return token;
}
