const config = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE_NAME || 'express_app'
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = config;
