import React, { ReactElement, ReactNode } from 'react';
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

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProviderWrapper>
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
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ThemeProviderWrapper>
      </CacheProvider>
    </>
  );
}
