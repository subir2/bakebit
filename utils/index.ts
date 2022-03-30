import hashPassword from './hashPwd';
import generateJwt from './generateJWT';
import comparePwd from './checkPwd';

export default {
  hashPwd: hashPassword,
  generateJWT: generateJwt,
  comparePassword: comparePwd,
};
