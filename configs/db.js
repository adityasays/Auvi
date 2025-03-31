import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon('postgresql://neondb_owner:npg_xboXWkl87Hiw@ep-ancient-sea-a59fbchq-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle({ client: sql });
