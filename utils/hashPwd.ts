import bcrypt from 'bcryptjs';

export default async function hashPassword(password: string) {
  const saltKey: string = await bcrypt.genSalt(16);
  const hashedPwd: string = await bcrypt.hash(password, saltKey);
  return hashedPwd;
}
