import DivComponent from '@/components/styledDiv2';
import Link from 'next/link';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Listing } from '@/types/listing';
import ModalPopUp from '@/components/modal';

//this is fake data remember to use real data from database by integrating it to the backend
const listingData: Listing[] = [
  {
    title: 'Listing 1',
    description: 'This is a metal bar',
    price: 400,
  },
  {
    title: 'Listing 2',
    description: 'Metal bar on sale',
    price: 400,
  },
  {
    title: 'Listing 3',
    description: 'Metal bar for sale',
    price: 400,
  },
];
const Listing = () => {
  return (
    <DivComponent>
      {listingData.map((listing) => (
        <Card sx={{ width: 400, m: 2 }}>
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
            <Link href="/specificListing/[id]">
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

export default Listing;
