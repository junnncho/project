import './editorjs-image.css';
import './font.css';
import './library.css';
import './styles.css';
import './theme.css';
import './test.css';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';
import 'reactflow/dist/style.css';
import { AppProps } from 'next/app';
import { Common } from '@junblog/frontend/components';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactFlowProvider } from 'reactflow';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <ReactFlowProvider>
        <Head>
          <title>NoteBrain</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <main className="app bg-secondary">
          <Common.TopBar>
            <Component {...pageProps} />
          </Common.TopBar>
        </main>
      </ReactFlowProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
