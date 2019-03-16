import crypto from 'crypto';

const md5 = (data): string =>
  crypto
    .createHash('md5')
    .update(data)
    .digest('hex');

export default md5;
