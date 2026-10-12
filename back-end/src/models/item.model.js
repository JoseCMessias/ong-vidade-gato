import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export const ItemModel = {
  async findAll() {
    return await sql`SELECT * FROM items ORDER BY id DESC`;
  },

  async create(name, description) {
    const [newItem] = await sql`
      INSERT INTO items (name, description) 
      VALUES (${name}, ${description}) 
      RETURNING *
    `;
    return newItem;
  }
};