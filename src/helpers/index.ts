// authentication helpers - helps to either encrypt the password or to create a random token

import crypto from 'crypto';

export const random = () => crypto.randomBytes(32).toString('base64');

export const authentication = (salt: string, password: string) => {
    const secret = process.env.SECRET || '';
    return crypto.createHmac('sha256', [salt, password].join('/'))
                 .update(secret)
                 .digest('hex');
};
