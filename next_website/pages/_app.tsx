import React, { ReactElement, ReactNode, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import * as ga from '../lib/ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// toastify
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/CustomDatePicker.css';
import { ToastContainer } from 'react-toastify';
import createEmotionCache from '@utils/emotion/createEmotionCache';
import ThemeProviderWrapper from '@theme/ThemeProvider';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
// toastify

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@components/shared/context/modalContext';
import GlobalStyle from 'styles/global';
import { CssBaseline } from '@mui/material';
import Modals from '@components/shared/Modals';


const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 1,
          },
        },
      }),
  );
  return (
    <>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={client}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProviderWrapper>
              <ModalsProvider>
                <ToastContainer
                  position='bottom-center'
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <GlobalStyle />
                <CssBaseline />
                <Modals />
                {getLayout(<Component {...pageProps} />, pageProps)}
              </ModalsProvider>
            </ThemeProviderWrapper>
          </Hydrate>
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
}
