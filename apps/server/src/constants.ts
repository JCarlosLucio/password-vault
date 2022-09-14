import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const PORT = Number(process.env.PORT) || 4000;
