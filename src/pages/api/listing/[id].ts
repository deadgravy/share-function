import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  const listingId = parseInt(id as string, 10);

  if (id === undefined) {
    res.status(400).json({ error: 'Missing listing ID' });
    return;
  }

  if (Number.isNaN(listingId)) {
    res.status(400).json({ error: `Invalid listing ID of ${id}` });
    return;
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (listing === null) {
      res.status(404).json({ error: `Listing of ID ${listingId} not found` });
      return;
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({
      error: (error as any).message,
    });
  }
};

export default handler;
