import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
