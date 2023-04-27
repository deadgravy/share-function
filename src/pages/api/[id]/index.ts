import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid'; // Import nanoid library for generating short IDs

const prisma = new PrismaClient(); // Create a Prisma Client instance

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req; // Retrieve the listing ID from the URL query parameter

  try {
    // Use Prisma Client to query the "listings" model and retrieve the listing
    const listing = await prisma.listings.findUnique({
      where: { id: parseInt(id as string) }, // Convert the listing ID to an integer
    });

    if (listing !== null) {
      // If the listing is found, check if hashed URL is already present
      if (listing.hashed_url == null) {
        // If hashed URL is not present, generate a shortened URL using nanoid
        const hashedUrl = nanoid(10); // Generate a 10-character long random ID
        // Use Prisma Client to update the listing with the shortened URL
        await prisma.listings.update({
          where: { id: listing.id },
          data: { hashed_url: hashedUrl },
        });
        // Construct the complete URL with the hashed URL appended to the base URL
        const shortUrl = `${process.env.FRONTEND_URL}/${hashedUrl as string}`;
        // Return the shortened URL value in the response
        res.status(200).json({ hashedUrl: shortUrl });
      } else {
        // If hashed URL is already present, construct the complete URL with the hashed URL appended to the base URL
        const shortUrl = `${process.env.FRONTEND_URL}/${listing.hashed_url}`;
        // Return the shortened URL value in the response
        res.status(200).json({ hashedUrl: shortUrl });
      }
    } else {
      // If the listing is not found, return an error message in the response
      res.status(404).json({ error: 'Listing not found' });
    }
  } catch (error) {
    // If there's an error, return an error message in the response
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client after using it
  }
};

export default handler; // Export the handler function
