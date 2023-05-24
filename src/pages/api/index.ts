import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => res.status(200).json({ message: 'Welcome to the API' });

export default handler;
