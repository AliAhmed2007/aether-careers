import { defineConfig } from 'drizzle-kit';
import { env } from './app/data/env/server';

export default defineConfig({
  out: './app/drizzle/migrations',
  schema: './app/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  },
});