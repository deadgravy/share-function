import { Button, Modal, Box } from '@mui/material';
import { useState } from 'react';

const data = {
  link: 'https://www.google.com',
};

const ModalPopUp = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{ display: 'flex', justifyContent: 'left', ml: 20 }}
      >
        Share
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            width: 300,
            padding: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <h2 id="child-modal-title">Copy this link</h2>
          <p id="child-modal-description">{data.link}</p>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
