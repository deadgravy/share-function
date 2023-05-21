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

  try {
    const listings = await prisma.listings.findMany();

    res.status(201).json({ data: { listings } });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default handler;
