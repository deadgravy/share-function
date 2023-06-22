import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useRouter } from 'next/router';

import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import { axiosClient } from '@/utils';

import type { IListing } from '@/types/Listing';

const NewListing = (listing: IListing): EmotionJSX.Element => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const createNewListing = async (): Promise<void> => {
    const { data } = await axiosClient.post('/api/listing/new-listing', {
      name,
      description,
      price,
    });

    if (data === null) {
      await router.push('/404');
      return;
    }

    await router.push(`/listing/${data as string}`);
  };

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
          minHeight: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 24,
        }}
      >
        <form>
          <Typography variant="h4">Create New Listing</Typography>
          <Box>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="productName"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={listing.name}
              sx={{ width: '100%', mt: 1 }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Product Description"
              variant="outlined"
              name="productDesc"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={listing.description}
              sx={{ width: '100%', mt: 1 }}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-basic"
              label="Product Price"
              variant="outlined"
              name="productPrice"
              type="text"
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              value={listing.price}
              sx={{ width: '100%', mt: 1 }}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '100%', mt: 1 }}
              onClick={async (event) => {
                event.preventDefault();
                await createNewListing();
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default NewListing;
