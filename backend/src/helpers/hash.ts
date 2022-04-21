import { genSaltSync, hashSync, compareSync } from "bcrypt";

const saltRounds = 10;

const salt = genSaltSync(10);

function hashPassword(password: string): string {
  return hashSync(password, salt);
}

function isMatch(password: string, encrypted: string): boolean {
  return compareSync(password, encrypted);
}

export { hashPassword, isMatch };
