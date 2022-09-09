import { hash, verify } from "argon2";

export const hashPassword = async (password: string) => {
  return await hash(password);
};

export const verifyPassword = async (hash: string, password: string) => {
  return await verify(hash, password);
};

export const comparePassword = (password: string, confirmPassword: string) =>
  password === confirmPassword;
