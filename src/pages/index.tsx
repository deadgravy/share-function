import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';

import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import ModalPopUp from '@/components/Modal';
import { axiosClient } from '@/utils';

import type { IListing } from '@/types/Listing';

const Home = (): EmotionJSX.Element => {
  const { data } = useQuery('get_all_listings', async () =>
    axiosClient.get('/api/listing')
  );

  return (
    <Box sx={{ mt: '4rem' }}>
      <Button variant="outlined" href="/new-listing">
        Create New Listing
      </Button>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          columnGap: '1rem',
          rowGap: '1rem',
        }}
      >
        {data?.data?.map((listing: IListing) => (
          <Card
            key={listing.id}
            sx={{ width: 400, m: 2, mr: 'auto', ml: 'auto' }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {listing.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {listing.description || 'No description'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                S${listing.price}
              </Typography>
            </CardContent>
            <CardActions>
              <ModalPopUp id={listing.id} />
              <Link href={`/listing/${listing.id}`}>
                <Button variant="outlined" sx={{ ml: 1 }}>
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
