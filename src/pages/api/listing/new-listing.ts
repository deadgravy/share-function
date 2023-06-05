import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';

interface ResponseBody {
  name: string;
  description: string;
  price: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, description, price }: ResponseBody = req.body;

  try {
    const { id } = await prisma.listing.create({
      data: {
        name,
        description,
        price,
      },
    });

    res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export default handler;
