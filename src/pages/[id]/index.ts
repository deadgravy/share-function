import type { GetServerSideProps } from 'next';

import prisma from '@/utils/prisma';

const RedirectPage = (): null => null;

const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const listing = await prisma.listing.findUnique({
    where: {
      hashedUrl: query.id as string,
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
      destination: `${process.env.FRONTEND_URL}/listing/${listing.id}`,
    },
  };
};

export { getServerSideProps };
export default RedirectPage;
