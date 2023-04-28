import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;

  if (id === undefined) {
    res.status(400).json({ error: 'Missing listing ID' });
    return;
  }

  try {
    const listing = await prisma.listings.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
    });

    if (listing === null) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    res.status(201).json({ data: { listing } });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default handler;
