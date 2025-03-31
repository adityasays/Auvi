// drizzle.config.js
export default {
  schema: "./configs/schema.js", 
  out: "./drizzle/migrations",  
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL, 
  },
};