import 'dotenv/config';

export const env = {
    BCRYPT_SALT: process.env.BCRYPT_SALT || "",
    PORT: process.env.PORT || 7420,
    SESSION_SECRET: process.env.SESSION_SECRET || "",
}