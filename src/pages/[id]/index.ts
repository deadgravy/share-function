import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ExamplePage = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const inputUrl = req.url;
    const shortUrl = `${process.env.FRONTEND_URL}${inputUrl as string}`;

    // Query the database for a listing with a matching hashed_url
    const listing = await prisma.listings.findUnique({
        where: {
            hashed_url: shortUrl,
        },
    });

    if (listing) {
        console.log(listing);

        // Redirect to google.com
        res.setHeader('Location', 'https://www.google.com');
        res.statusCode = 302;
        res.end();
    } else {
        console.log(`Listing not found for URL: ${shortUrl}`);
        res.statusCode = 404;
        res.end();
    }

    // Return an object with inputUrl
    return { props: { inputUrl } };
};

export default ExamplePage;
