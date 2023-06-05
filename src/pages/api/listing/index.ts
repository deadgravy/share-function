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

  try {
    const listings = await prisma.listing.findMany();

    res.status(201).json(listings);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default handler;
