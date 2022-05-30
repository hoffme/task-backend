import 'dotenv/config';

const config = {
  port: process.env.PORT || '4000',
  storage: {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || 'test',
    pass: process.env.PG_PASS || 'test',
    database: process.env.PG_DB || 'test',
  },
};

export default config;
