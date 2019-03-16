import md5 from '../utils/MD5';

export type HashFn = (data) => string;

export const md5Hasher: HashFn = data => md5(JSON.stringify(data));

export const identHasher: HashFn = (data: string) => data;

export const prefixedHasher = (prefix: string, fn: HashFn): HashFn => data =>
  `${prefix}${fn(data)}`;

export const defaultHasher = md5Hasher;
