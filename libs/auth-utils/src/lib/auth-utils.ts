import crypto from 'crypto'

interface IHash {
  salt: string,
  hash: string
}

export function hash(pwd: string): IHash {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, `sha512`).toString(`hex`);

  return { salt, hash }
}

export const compare = (pwd: string, salt: string, hash: string): boolean => {
  const getHash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, `sha512`).toString(`hex`);

  return getHash === hash
}
