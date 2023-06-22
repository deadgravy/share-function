import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import ModalPopUp from '@/components/Modal';
import { axiosClient } from '@/utils';

const Listing = (): EmotionJSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(
    'get_all_listings',
    async () => axiosClient.get(`/api/listing/${id as string}`),
    {
      enabled: router.isReady,
    }
  );

  return (
    <>
      <IconButton
        sx={{ position: 'absolute', left: 25, top: 25 }}
        onClick={() => void router.back()}
      >
        <ArrowBack />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 2 }}>
          {data?.data.name}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          S${data?.data.price}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
          Description
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'regular' }}>
          {data?.data.description || 'No description provided'}
        </Typography>
        <ModalPopUp id={parseInt(id as string, 10)} />
      </Box>
    </>
  );
};

export default Listing;
