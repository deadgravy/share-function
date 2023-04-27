import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ExamplePage = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const inputUrl = req.url;
    const shortUrl = `${process.env.FRONTEND_URL}${inputUrl as string}`;
    const searchUrl = inputUrl?.substring(1)


    // Query the database for a listing with a matching hashed_url 
    console.log(searchUrl)
    const listing = await prisma.listings.findUnique({
        where: {
            hashed_url: searchUrl as string,
        },
    });

    if (listing) {
        console.log(listing);
        // Redirect to localhost:3000/listing/{product_name}-{id}
        var product_name = listing.name
        var id = listing.id
        res.setHeader('Location', 'http://localhost:3000/listing/' + product_name + '-' + id);
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
