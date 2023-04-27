import DivComponent from '@/components/styledDiv2';
import Link from 'next/link';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import type { IListing } from '@/types/listing';
import ModalPopUp from '@/components/modal';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

// this is fake data remember to use real data from database by integrating it to the backend
const listingData: IListing[] = [
  {
    id: 1,
    title: 'Listing 1',
    description: 'This is a metal bar',
    price: 400,
  },
  {
    id: 2,
    title: 'Listing 2',
    description: 'Metal bar on sale',
    price: 400,
  },
  {
    id: 3,
    title: 'Listing 3',
    description: 'Metal bar for sale',
    price: 400,
  },
];
const Home = (): EmotionJSX.Element => {
  return (
    <DivComponent>
      <Link href="/create-listing">
        <Button variant="outlined" sx={{ mr: 'auto', ml: 'auto' }}>
          Create Listing
        </Button>
      </Link>
      {listingData.map((listing) => (
        <Card
          key={listing.id}
          sx={{ width: 400, m: 2, mr: 'auto', ml: 'auto' }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {listing.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {listing.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              S${listing.price}
            </Typography>
          </CardContent>
          <CardActions>
            <ModalPopUp />
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
};

export default Home;
