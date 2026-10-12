import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export const ItemModel = {
  async findAll() {
    return await sql`SELECT * FROM items ORDER BY id DESC`;
  },

  async findById(id) {
    const [item] = await sql`SELECT * FROM items WHERE id = ${id}`;
    return item;
  },

  async findByName(name) {
    return await sql`SELECT * FROM items WHERE name ILIKE ${'%' + name + '%'}`;
  },

  async create(name, description) {
    const [newItem] = await sql`
      INSERT INTO items (name, description) 
      VALUES (${name}, ${description}) 
      RETURNING *
    `;
    return newItem;
  },

  async update(id, name, description) {
    const [updatedItem] = await sql`
      UPDATE items 
      SET name = ${name}, description = ${description} 
      WHERE id = ${id} 
      RETURNING *
    `;
    return updatedItem;
  },

  async delete(id) {
    const [deletedItem] = await sql`
      DELETE FROM items WHERE id = ${id} 
      RETURNING *
    `;
    return deletedItem;
  }
};