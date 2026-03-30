import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '../data/env/server';

export const db = drizzle(env.DATABASE_URL!, );
