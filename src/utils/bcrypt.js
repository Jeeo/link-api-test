import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const encrypt = (pwd) => bcrypt.hashSync(pwd, SALT_ROUNDS);
export const { compare } = bcrypt;
