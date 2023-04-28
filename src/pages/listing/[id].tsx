import ModalPopUp from '@/components/modal';
import DivComponent from '@/components/styledDiv';
import type { IListing } from '@/types/listing';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from '@/utils/axios';

const Listing = (): EmotionJSX.Element => {

  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { data } = useQuery(
    'get_all_listings',
    async () => {
      return await axios.get(`/listings/${(id as string)}`);
    }
  );

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
              {data.data.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'left', ml: 20, mb: 2 }}
            >
              S${data.data.price}
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
              {data.data.description}
            </Typography>
            <ModalPopUp />
          </DivComponent>
        </Card>
      </div>
    </Box>
  );
};

export default Listing;
