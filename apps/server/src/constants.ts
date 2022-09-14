import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const PORT = Number(process.env.PORT) || 4000;

export const DATABASE_URL = process.env.DATABASE_URL || '';
