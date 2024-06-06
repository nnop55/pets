import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

export const comparePassword = async (
  inputPassword: string,
  password: string,
) => {
  return await compare(inputPassword, password);
};
