import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Close from '@mui/icons-material/Close';
import ContentCopy from '@mui/icons-material/ContentCopy';

import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { axiosClient } from '@/utils';

interface ModalPopUpProps {
  id: number;
}

interface ShortenUrlResponse {
  hash: string;
  shortUrl: string;
}

const ModalPopUp = ({ id }: ModalPopUpProps): EmotionJSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [copyClicked, setCopyClicked] = useState<boolean>(false);
  const [shortUrlResponse, setShortUrlResponse] = useState<ShortenUrlResponse>({
    hash: '',
    shortUrl: '',
  });

  const getHashedUrl = async (listingId: number) => {
    if (shortUrlResponse.shortUrl) return;

    const { data } = await axiosClient.get(
      `/api/listing/shorten-url/${listingId}`
    );

    setShortUrlResponse(data);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={(): void => {
          setOpen(true);
          getHashedUrl(id);
        }}
        sx={{ display: 'flex', justifyContent: 'left', ml: 20 }}
      >
        Share
      </Button>

      <Modal
        open={open}
        onClose={(): void => {
          setOpen(false);
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            width: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <IconButton
            sx={{ position: 'absolute', left: 5, top: 5 }}
            onClick={(): void => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 8 }}>
            <OutlinedInput
              id="child-modal-description"
              inputProps={{
                readOnly: true,
              }}
              endAdornment={
                <InputAdornment sx={{ m: 0 }} position="end">
                  <Tooltip
                    title={copyClicked ? 'Copied!' : 'Copy to Clipboard'}
                    placement="top"
                  >
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          shortUrlResponse.shortUrl
                        );
                        setCopyClicked(true);
                        setTimeout(() => {
                          setCopyClicked(false);
                        }, 5000);
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
              value={shortUrlResponse.shortUrl}
              size="small"
              sx={{
                width: `${shortUrlResponse.shortUrl.length * 1.11}ch`,
                p: 0,
                pr: 0.5,
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalPopUp;
