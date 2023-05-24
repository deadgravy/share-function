/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prismaClient: PrismaClient = new PrismaClient();

const main = async (): Promise<void> => {
  console.log('Seeding public.listings...');

  const listing1 = await prismaClient.listing.create({
    data: {
      name: 'Selling metal beam',
      price: 100.01,
      description: 'This is a metal beam',
    },
  });

  console.log(listing1);

  const listing2 = await prismaClient.listing.create({
    data: {
      name: 'Selling metal rods',
      price: 200.02,
    },
  });

  console.log(listing2);
  console.log('Successfully seeded public.listings');
  console.log('Seeding public.listing_images...');

  const listingImage1 = await prismaClient.listingImage.create({
    data: {
      listingId: listing1.id,
      image: 'https://picsum.photos/1920/1080',
    },
  });

  console.log(listingImage1);

  const listingImage2 = await prismaClient.listingImage.create({
    data: {
      listingId: listing2.id,
      image: 'https://picsum.photos/1920/1080',
    },
  });

  console.log(listingImage2);
  console.log('Successfully seeded public.listing_images');
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
