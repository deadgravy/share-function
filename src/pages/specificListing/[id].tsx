import ModalPopUp from '@/components/modal';
import DivComponent from '@/components/styledDiv';
import { Listing } from '@/types/listing';
import { Box, Card, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const data: Listing = {
  title: 'Listing 1',
  description: 'Metal bar description 1... goes till very long',
  price: 400,
};

const SpecificListing = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
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
              {data.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', textAlign: 'left', ml: 20, mb: 2 }}
            >
              S${data.price}
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
              {data.description}
            </Typography>
            {/* <Button sx={{display: 'flex', justifyContent:'left', ml: 19}}>
              Share
            </Button> */}
            <ModalPopUp />
          </DivComponent>
        </Card>
      </div>
    </Box>
  );
};

export default SpecificListing;
