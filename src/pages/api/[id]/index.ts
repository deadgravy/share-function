import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { shortenUrl } from '@/utils/shortenUrl';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query; // Retrieve the listing ID from the URL query parameter

  try {
    // Use Prisma Client to query the "listings" model and retrieve the listing
    const listing = await prisma.listings.findUnique({
      where: { id: parseInt(id as string, 10) }, // Convert the listing ID to an integer
    });

    if (listing === null) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    // If the listing is found, check if hashed URL is already present
    if (listing.hashed_url === null) {
      // If hashed URL is not present, generate a shortened URL using nanoid
      const hashedUrl = shortenUrl(); // Generate a 10-character long random ID

      // Use Prisma Client to update the listing with the shortened URL
      await prisma.listings.update({
        where: { id: listing.id },
        data: { hashed_url: hashedUrl },
      });

      // Construct the complete URL with the hashed URL appended to the base URL
      const shortUrl = `${process.env.FRONTEND_URL}/${hashedUrl}`;
      // Return the shortened URL value in the response
      res.status(200).json({ data: { shortUrl } });
      return;
    }

    // If hashed URL is already present, construct the complete URL with the hashed URL appended to the base URL
    const shortUrl = `${process.env.FRONTEND_URL}/${listing.hashed_url}`;
    // Return the shortened URL value in the response
    res.status(200).json({ data: { shortUrl } });
    return;
  } catch (error) {
    // If there's an error, return an error message in the response
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler; // Export the handler function
