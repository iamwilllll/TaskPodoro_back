import 'dotenv/config';

const config = {
    server: {
        PORT: process.env.SERVER_PORT || 3000,
    },

    database: {
        USER: process.env.DATABASE_USER || '',
        PASS: process.env.DATABASE_PASS || '',
        URL: process.env.DATABASE_URL || '',
    },
};

export default config;
