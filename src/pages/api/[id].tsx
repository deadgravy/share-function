import { NextApiRequest, NextApiResponse } from 'next';
import { getListingsFromDatabase } from '../../../prisma/sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const listing = await getListingsFromDatabase(parseInt(id as string));

    if (listing) {
      res.status(200).json(listing);
    } else {
      res.status(404).json({ message: `Listing with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving listing from database' });
  }
}
