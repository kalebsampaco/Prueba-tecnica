import * as bcrypt from "bcryptjs"; //

export const getHash = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const compareHash = async (
  password: string | undefined,
  hash: string | undefined
): Promise<boolean> => bcrypt.compare(password, hash);

export const getTokenFromHeader = (authorizationHeader) =>
  authorizationHeader.substr(7, authorizationHeader.length);
