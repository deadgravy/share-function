import ModalPopUp from '@/components/modal';
import DivComponent from '@/components/styledDiv';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from '@/utils/axios';

function Listing(): EmotionJSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery('get_all_listings', async () => axios.get(`/api/listings/${id as string}`),
    {
      enabled: router.isReady,
    });

  const getHashedUrl = async (listingId: number): Promise<string> => {
    try {
      const res = await axios.get(`/api/${listingId}`);
      // console.log(res.data.data.shortUrl)
      return res.data.data.shortUrl;
    } catch (err) {
      return 'default url';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <Card sx={{ borderRadius: 5, width: 1000 }}>
          <DivComponent>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'medium', textAlign: 'left', ml: 20, mb: 2 }}
            >
              {data?.data.data.listing.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'left', ml: 20, mb: 2 }}
            >
              S${data?.data.data.listing.price}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'medium', textAlign: 'left', ml: 20, mb: 2 }}
            >
              Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 'regular', textAlign: 'left', mx: 20, mb: 2 }}
            >
              {data?.data.data.listing.description}
            </Typography>
            <ModalPopUp id={getHashedUrl(parseInt((id as string), 10))} />
          </DivComponent>
        </Card>
      </div>
    </Box>
  );
}

export default Listing;
