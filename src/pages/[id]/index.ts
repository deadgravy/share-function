import type { GetServerSideProps } from 'next';
import prisma from '@/utils/prisma';

function RedirectPage(): null {
 return null
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const inputUrl = req.url;
  const searchUrl = inputUrl?.substring(1);

  const listing = await prisma.listings.findUnique({
    where: {
      hashed_url: searchUrl as string,
    },
  });

  if (listing === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
    redirect: {
      destination: `http://localhost:3000/listing/${listing.id}`,
    },
  };
};

export { getServerSideProps };
export default RedirectPage;
