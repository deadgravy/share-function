import { useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import Box from '@mui/material/Box';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '1024px',
          mr: 'auto',
          ml: 'auto',
        }}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
