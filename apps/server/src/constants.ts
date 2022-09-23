import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 4000;

export const DATABASE_URL = process.env.DATABASE_URL || '';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || 'localhost';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production' || false;
