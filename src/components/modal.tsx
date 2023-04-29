import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Button, Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react';

interface ModalPopUpProps {
  id: any;
}

const ModalPopUp = ({ id }: ModalPopUpProps): EmotionJSX.Element => {
  const [shortenUrl, setUrl] = useState<string>("");

  useEffect(() => {
    id.then((result: string) => {
      console.log(result);
      setUrl(result);
    });
  }, [id]);

  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant="outlined"
        onClick={(): void => { setOpen(true); }}
        sx={{ display: 'flex', justifyContent: 'left', ml: 20 }}
      >
        Share
      </Button>

      <Modal
        open={open}
        onClose={(): void => { setOpen(false); }}
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
          <p id="child-modal-description">{shortenUrl}</p>
          <Button variant="contained" onClick={(): void => { setOpen(false); }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
