
module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'test', // your pwd
        database: process.env.DB_NAME || 'upshot_analytics',
        host: process.env.DB_HOSTNAME || 'localhost',
        port: process.env.PG_PORT || '5432',
        dialect: "postgres",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
