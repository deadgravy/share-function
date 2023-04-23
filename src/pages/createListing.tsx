import { Button, TextField, Typography } from '@mui/material';
import DivComponent from '../components/styledDiv';
import { useState } from 'react';
import { Listing } from '../types/listing';

const CreateListing = (listing: Listing) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  //   const [file, setFile] = useState(null);

  //   const fileSelected = (event) => {
  //     const file = event.target.files[0];
  //     setFile(file);
  //   };
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
              onChange={(e) => setTitle(e.target.value)}
              value={listing.title}
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
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setPrice(Number(e.target.value))}
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
