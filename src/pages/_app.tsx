import { useState } from 'react';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
