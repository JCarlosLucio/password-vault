import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const PORT = Number(process.env.PORT) || 4000;

export const DATABASE_URL = process.env.DATABASE_URL || '';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
