import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(), 
  imageUrl: varchar("imageurl", { length: 255 }), 
  subscription: boolean("subscription").default(false),
});