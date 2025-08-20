import { neon } from '@neondatabase/serverless';

// This file should only be imported on the server side
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);

export default sql;