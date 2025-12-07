import 'dotenv/config';

const config = {
    environment: process.env.NODE_ENV || 'development',
    salt: process.env.SALT || 25,

    server: {
        PORT: process.env.SERVER_PORT || 3000,
    },

    database: {
        USER: process.env.DATABASE_USER || '',
        PASS: process.env.DATABASE_PASS || '',
        URL: process.env.DATABASE_URL || '',
    },

    smtp: {
        HOST: process.env.SMTP_HOST || '',
        USER: process.env.SMTP_USER || '',
        PASS: process.env.SMTP_PASS || '',
        PORT: process.env.SMTP_PORT || 587,
    },

    jwt: {
        KEY: process.env.JWT_API_KEY || '',
    },
};

export default config;
