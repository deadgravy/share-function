import DivComponent from '@/components/styledDiv2';
import Link from 'next/link';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import axios from '@/utils/axios';
import { useQuery } from 'react-query';
import type { IListing } from '@/types/Listing';
import ModalPopUp from '@/components/modal';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

function Home(): EmotionJSX.Element {
  const { data } = useQuery('get_all_listings', async () => axios.get('/api/listings'));

  return (
    <DivComponent>
      <Link href="/create-listing">
        <Button variant="outlined" sx={{ mr: 'auto', ml: 'auto' }}>
          Create Listing
        </Button>
      </Link>
      {data?.data?.data.listings.map((listing: IListing) => (
        <Card
          key={listing.id}
          sx={{ width: 400, m: 2, mr: 'auto', ml: 'auto' }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {listing.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {listing.description}
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
    </DivComponent>
  );
}

export default Home;
