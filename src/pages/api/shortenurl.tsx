/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { url, hashed_url } = req.body;

  if (!url) {
    res.status(400).send('Bad Request: URL is required');
    return;
  }

  try {
    let createdUrl;
    let responseUrl;

    if (!hashed_url) {
      // generate a hash value for the original URL
      const hash = createHash('sha256').update(url).digest('hex').substr(0, 8);

      // create a new Url record in the database
      createdUrl = await prisma.url.create({
        data: { url, hash },
      });

      // construct the shortened URL using the hash as the path
      responseUrl = { url: createdUrl.url, shortened_url: `https://example.com/${createdUrl.hash}` };
    } else {
      // retrieve the Url record from the database based on the hashed_url parameter
      const foundUrl = await prisma.url.findUnique({
        where: { hash: hashed_url },
      });

      if (!foundUrl) {
        res.status(404).send('URL not found');
        return;
      }

      // construct the response object with both the original URL and the shortened URL
      responseUrl = { url: foundUrl.url, shortened_url: `https://example.com/${foundUrl.hash}` };
    }

    res.json(responseUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
