import bcrypt from 'bcryptjs';

export default async function comparePwd(pwd: string, hashPwd: string) {
  const compare = await bcrypt.compare(pwd, hashPwd);
  if (compare) {
    return true;
  }
  return false;
}
