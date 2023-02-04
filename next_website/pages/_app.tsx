import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as ga from '../lib/ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// toastify


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <>
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
  <Component {...pageProps} />
</>
}
