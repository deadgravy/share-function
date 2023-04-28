import { Button, TextField, Typography } from '@mui/material';
import DivComponent from '../components/styledDiv';
import { useState } from 'react';
import type { IListing } from '../types/listing';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const CreateListing = (listing: IListing): EmotionJSX.Element => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  return (
    <main>
      <DivComponent className="flex min-h-screen flex-col items-center justify-between p-24">
        <form>
          <Typography variant="h4">Product Information</Typography>
          <div>
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              name="productName"
              type="text"
              onChange={(e) => { setName(e.target.value); }}
              value={listing.name}
              sx={{ width: '50%', m: 1 }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Product Description"
              variant="outlined"
              name="productDesc"
              type="text"
              onChange={(e) => { setDescription(e.target.value); }}
              value={listing.description}
              sx={{ width: '50%', m: 1 }}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Product Price"
              variant="outlined"
              name="productPrice"
              type="text"
              onChange={(e) => { setPrice(Number(e.target.value)); }}
              value={listing.price}
              sx={{ width: '50%', m: 1 }}
            />
          </div>
          {/* <div>
                <Typography>Product Image</Typography>    
                <input type="file" name="productImage" accept='image/*' onChange={fileSelected}/>
            </div> */}
          <div>
            <Button type="submit" variant="contained" sx={{ m: 2 }}>
              Submit
            </Button>
          </div>
        </form>
      </DivComponent>
    </main>
  );
};

export default CreateListing;
