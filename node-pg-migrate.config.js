require('dotenv').config();
const path = require('path');

module.exports = {
  migrationsTable: 'pgmigrations',     
  createMigrationsSchema: false,         
  dir: path.resolve(__dirname, 'src/core/database/migrations'),
  databaseUrl: process.env.DATABASE_URL,
  migrationFileExtension: '.js',
  schema: process.env.DB_SCHEMA,   
  createSchema: true,  
  direction: 'up',
};
