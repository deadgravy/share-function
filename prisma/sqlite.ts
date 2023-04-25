import sqlite from 'sqlite';

export async function getListingsFromDatabase(id: number) {
  const db = await sqlite.open('./development.db');
  const listing = await db.get('SELECT * FROM listings WHERE id = ?', id);
  await db.close();
  return listing;
}
