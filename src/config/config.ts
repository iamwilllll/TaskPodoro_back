import 'dotenv/config';

const config = {
    server: {
        PORT: process.env.SERVER_PORT || 3000,
    },
};

export default config;
