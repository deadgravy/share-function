import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/utils/prisma';
import { shortenUrl } from '@/utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // Check if the request method is GET
  // If not, return an error message in the response
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id } = req.query;
  const listingId = parseInt(id as string, 10);

  if (id === undefined) {
    // If the listing ID is not present, return an error message in the response
    res.status(400).json({ error: 'Missing listing ID' });
    return;
  }

  if (Number.isNaN(listingId)) {
    // If the listing ID is not a number, return an error message in the response
    res.status(400).json({ error: `Invalid listing ID of ${id}` });
    return;
  }

  try {
    // Use Prisma Client to query the `public.listings` table and retrieve the listing
    const listing = await prisma.listing.findUnique({
      where: { id: listingId }, // Convert the listing ID to an integer
    });

    if (listing === null) {
      // If the listing is not found, return an error message in the response
      res.status(404).json({ error: `Listing of ID ${listingId} not found` });
      return;
    }

    // If the listing is found, check if hashed URL is already present
    if (listing.hashedUrl === null) {
      // If hashed URL is not present, generate a shortened URL the shortenUrl function
      const hashedUrl = shortenUrl(10); // Generate a 10-character long URL safe string

      // Use Prisma Client to update the listing with the shortened URL
      await prisma.listing.update({
        where: { id: listing.id },
        data: { hashedUrl },
      });

      // Construct the complete URL with the hashed URL appended to the base URL
      const shortUrl = `${process.env.FRONTEND_URL}/${hashedUrl}`;
      // Return the shortened URL value in the response
      res.status(200).json({ hash: hashedUrl, shortUrl });
      return;
    }

    // If hashed URL is already present, construct the complete URL with the hashed URL appended to the base URL
    const shortUrl = `${process.env.FRONTEND_URL}/${listing.hashedUrl}`;
    // Return the hash and the shortened URL in the response
    res.status(200).json({ hash: listing.hashedUrl, shortUrl });
    return;
  } catch (error) {
    // If there's an error, return an error message in the response
    res.status(500).json({ error: (error as any).message });
  }
};

export default handler;
