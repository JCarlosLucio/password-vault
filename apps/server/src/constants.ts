import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = Number(process.env.PORT) || 4000;

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || 'localhost';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production' || false;

export const DATABASE_URL =
  (IS_PRODUCTION ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL) ||
  '';

export const IS_TESTING = process.env.NODE_ENV === 'test';
